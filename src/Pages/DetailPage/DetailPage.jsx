import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  requestCast,
  requestEpisodes,
  requestSimilar,
} from "../../Api/Requests";
import Carousel from "../../Components/Carousel/Carousel";
import DetailSkeleton from "../../Components/SkeletonLoading/DetailSkeleton";
import { findGenreName } from "../../Helpers/findGenreName";

export default function DetailPage({ genreMovie, genreTv }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [visibility, setVisibility] = useState("cast");

  const handleActiveClass = (e) => {
    setVisibility(e.target.textContent.toLowerCase());
    if (!e.target.className) {
      for (let i = 0; i < e.target.parentElement.children.length; i++) {
        if (e.target.parentElement.children[i].className) {
          e.target.parentElement.children[i].classList.remove("active");
        }
      }
      e.target.classList = "active";
    }
  };

  return (
    <div className="detail-page-outline">
      <div
        style={
          loaded
            ? { zIndex: "-999" }
            : { width: "100%", height: "100vh", backgroundColor: "#121212" }
        }
        className="loading-pseduo-container"
      >
        <img
          style={loaded ? { display: "block" } : { display: "none" }}
          className="background-img"
          src={
            location?.state?.backdrop_path !== null
              ? `http://image.tmdb.org/t/p/original//${location?.state?.backdrop_path}`
              : "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80"
          }
          alt=""
          onLoad={() => setLoaded(true)}
        />
        {loaded ? (
          <div className="detail-page-container">
            <div className="detail-page-container__go-back">
              <i
                onClick={() => navigate(-1)}
                className="fas fa-long-arrow-alt-left"
              ></i>
            </div>
            <div className="detail-page-container__info">
              <div className="detail-page-container__info__poster">
                <img
                  loading="eager"
                  src={
                    location?.state?.poster_path
                      ? `http://image.tmdb.org/t/p/w500//${location?.state?.poster_path}`
                      : "https://images.unsplash.com/photo-1542423348-821c6bb30fe6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80"
                  }
                  alt={
                    location?.state?.title
                      ? location?.state?.title + "-img"
                      : location?.state?.name + "-img"
                  }
                />
              </div>
              <div
                style={{ color: "white" }}
                className="detail-page-container__info__overview"
              >
                <h2>
                  {location?.state?.title
                    ? location?.state?.title
                    : location?.state?.name}
                </h2>
                <div className="overview--details">
                  <p>
                    {location?.state?.release_date
                      ? location?.state?.release_date.substring(0, 4)
                      : location?.state?.first_air_date.substring(0, 4)}
                  </p>
                  {location?.state?.number_of_seasons && (
                    <p>
                      {location?.state?.number_of_seasons > 1
                        ? `${location?.state?.number_of_seasons} seasons`
                        : `${location?.state?.number_of_seasons} season`}
                    </p>
                  )}
                  <p>{location?.state?.vote_average}</p>
                  {location?.state?.adult && <p>18+</p>}
                </div>
                <div className="genre">
                  {location?.state?.genre_ids.map((genre, id) => (
                    <p key={id}>
                      {findGenreName(
                        location?.state?.title ? genreMovie : genreTv,
                        genre
                      )}
                    </p>
                  ))}
                </div>
                {window.matchMedia("(min-width: 1000px)").matches && (
                  <p className="overview">{location?.state?.overview}</p>
                )}
                <button
                  onClick={() =>
                    navigate("/trailer", { state: location?.state })
                  }
                  className="play-btn"
                >
                  <i className="fas fa-play"></i>
                  <p>Play</p>
                </button>
              </div>
            </div>
            {window.matchMedia("(max-width: 1000px)").matches && (
              <div className="plot-summary">
                <p>Plot Summary : </p>
                <p className="overview">{location?.state?.overview}</p>
              </div>
            )}
            <div className="detail-page-container__switch-tabs">
              <ul>
                <li className="active" onClick={(e) => handleActiveClass(e)}>
                  Cast
                </li>
                <li onClick={(e) => handleActiveClass(e)}>More Like This</li>
                {location?.state?.name && (
                  <li onClick={(e) => handleActiveClass(e)}>Episodes</li>
                )}
              </ul>
            </div>
            {visibility === "cast" && (
              <div className="detail-page-container__cast">
                <Carousel
                  header={"Cast"}
                  fetchData={requestCast(
                    location?.state?.title ? "movie" : "tv",
                    location?.state?.id
                  )}
                />
              </div>
            )}
            {visibility === "more like this" && (
              <div className="detail-page-container__similar">
                <Carousel
                  header={"More like this"}
                  fetchData={requestSimilar(
                    location?.state?.title ? "movie" : "tv",
                    location?.state?.id
                  )}
                />
              </div>
            )}
            {visibility === "episodes" && (
              <div className="detail-page-container__episodes">
                <Carousel
                  header={"Episodes"}
                  fetchData={requestEpisodes(location?.state?.id, 1)}
                  id={location?.state?.id}
                />
              </div>
            )}
          </div>
        ) : (
          <DetailSkeleton />
        )}
      </div>
    </div>
  );
}
