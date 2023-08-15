import React, { useEffect, useState } from "react";
import { findGenreName } from "../../Helpers/findGenreName";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import TrendingSkeleton from "../SkeletonLoading/TrendingSkeleton";

export default function Trending({ fetchUrl, genreMovie, genreTv }) {
  const [randomNumber, setRandomNumber] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 21));
  }, []);

  const { data, isLoading } = useQuery(
    "moviesPageData",
    () => axios(fetchUrl),
    { refetchOnWindowFocus: false }
  );

  if (isLoading) {
    return (
      <div className="trending-container">
        <TrendingSkeleton />
      </div>
    );
  }

  return (
    <div className="trending-container">
      <img
        style={imgLoaded ? { display: "block" } : { display: "none" }}
        className="trending-background-img"
        src={
          data?.data?.results[randomNumber].backdrop_path !== null &&
          `http://image.tmdb.org/t/p/original//${data?.data?.results[randomNumber].backdrop_path}`
        }
        alt={
          data?.data?.results[randomNumber].title
            ? data?.data?.results[randomNumber].title + "-img"
            : data?.data?.results[randomNumber].name + "-img"
        }
        onLoad={() => setImgLoaded(true)}
      />
      {imgLoaded ? (
        <div className="trending-container__content">
          <div className="trending-container__content__genre">
            {data.data.results[randomNumber].genre_ids.map((genre, id) => (
              <p key={id}>
                {findGenreName(
                  data?.data?.results[randomNumber].media_type === "movie"
                    ? genreMovie
                    : genreTv,
                  genre
                )}
              </p>
            ))}
          </div>
          <h1>
            {data?.data?.results[randomNumber].title !== undefined
              ? data?.data?.results[randomNumber].title
              : data?.data?.results[randomNumber].name}
          </h1>
          <p>{data?.data?.results[randomNumber].overview}</p>
          <button
            onClick={() =>
              navigate("/trailer", { state: data?.data?.results[randomNumber] })
            }
            className="play-btn"
          >
            <i className="fas fa-play"></i>
            <p>Play</p>
          </button>
        </div>
      ) : (
        <TrendingSkeleton />
      )}
    </div>
  );
}
