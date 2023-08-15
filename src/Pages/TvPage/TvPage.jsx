import React from "react";
import Trending from "../../Components/Trending/Trending";
import Row from "../../Components/Row/Row";
import { requests } from "../../Api/Requests";

export default function TvPage({ genreMovie, genreTv }) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  return (
    <div className="movies-page-container">
      <Trending
        genreMovie={genreMovie}
        genreTv={genreTv}
        fetchUrl={requests.getTrendingSeries}
      />
      <div className="movies-page-container__row-container">
        <Row
          genreMovie={genreMovie}
          genreTv={genreTv}
          title={"Now Playing"}
          fetchUrl={requests.getTvOnAir}
        />
        <Row
          genreMovie={genreMovie}
          genreTv={genreTv}
          title={"Upcoming"}
          fetchUrl={requests.getAiringToday}
        />
        <Row
          genreMovie={genreMovie}
          genreTv={genreTv}
          title={"Top Rated"}
          fetchUrl={requests.getTopRatedTv}
        />
        <Row
          genreMovie={genreMovie}
          genreTv={genreTv}
          title={"Popular"}
          fetchUrl={requests.getPopularTv}
        />
        {genreTv.length > 0 &&
          genreTv.map((item, id) => (
            <Row
              key={id}
              genreMovie={genreMovie}
              genreTv={genreTv}
              title={item.name}
              fetchUrl={`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=${item.id}`}
            />
          ))}
      </div>
    </div>
  );
}
