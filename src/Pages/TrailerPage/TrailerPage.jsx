import React from "react";
import axios from "axios";
import { requestSpecific } from "../../Api/Requests";
import { useLocation } from "react-router";
import { useQuery } from "react-query";
import YouTube from "react-youtube";
import Loading from "../../Components/Loading/Loading";

export default function TrailerPage() {
  const location = useLocation();

  const { data, isLoading: isItemLoading } = useQuery(
    ["itemData", location.state.id],
    () =>
      axios(
        requestSpecific(
          location.state.title ? "movie" : "tv",
          location.state.id
        )
      ),
    {
      refetchOnWindowFocus: false,
      enabled: !!location.state,
    }
  );

  const opts = {
    playerVars: {
      autoplay: 1,
      rel: 0,
      modestbrandong: 1,
    },
  };

  if (isItemLoading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    );
  }

  return (
    <div className="trailer-page-container">
      {data && (
        <div className="trailer-container">
          <YouTube
            className="iframe"
            videoId={data.data.videos.results[0].key}
            opts={opts}
          />
        </div>
      )}
    </div>
  );
}
