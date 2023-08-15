import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { requestEpisodes, requestSpecific } from "../../Api/Requests";
import CarouselSkeleton from "../SkeletonLoading/CarouselSkeleton";

export default function Carousel({ header, fetchData, id }) {
  const carouselRef = useRef();
  const isRequired = header === "Episodes";
  const [seasonNumber, setSeasonNumber] = useState(null);
  const navigate = useNavigate();
  const [episodeNumber, setEpisodeNUmber] = useState(1);
  const { data, isLoading } = useQuery(
    ["data", fetchData],
    () => axios(fetchData),
    { refetchOnWindowFocus: false, enabled: !!fetchData }
  );

  const { data: briefData } = useQuery(
    ["briefData", header],
    () => axios(requestSpecific("tv", id)),
    { refetchOnWindowFocus: false, enabled: isRequired }
  );

  const { data: episodesData, isLoading: isEpisodesLoading } = useQuery(
    ["episodesData", seasonNumber],
    () => axios(requestEpisodes(id, seasonNumber)),
    {
      refetchOnWindowFocus: false,
      enabled: !!seasonNumber,
    }
  );

  const handleLeftClick = () => {
    if (carouselRef.current.scrollLeft !== 0)
      carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
  };

  const handleRightClick = () => {
    carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
  };

  let filteredSeasons =
    briefData &&
    briefData.data.seasons.filter(
      (season) => season.episode_count > 0 && season.season_number > 0
    );

  if (isLoading) {
    return <CarouselSkeleton header={isRequired} />;
  }

  if (isEpisodesLoading) {
    return <CarouselSkeleton header={isRequired} />;
  }

  return (
    <div className="carousel-container">
      <div
        className={`carousel__header ${
          briefData &&
          filteredSeasons.length > 1 &&
          "carousel__header--modifier"
        }`}
      >
        {header === "Episodes" && briefData && filteredSeasons.length > 1 && (
          <div
            onMouseLeave={() =>
              (document.querySelector(".dropdown-content").style.display =
                "none")
            }
            className="dropdown"
          >
            <button
              onMouseEnter={() =>
                (document.querySelector(".dropdown-content").style.display =
                  "block")
              }
              className="dropbtn"
            >
              {briefData.data.seasons[0].season_number === 1
                ? briefData.data.seasons[0].name
                : briefData.data.seasons[1].name}
            </button>
            <div className="dropdown-content">
              {filteredSeasons.map((season, id) => (
                <p
                  onClick={(e) => {
                    setSeasonNumber(e.target.textContent.split(" ")[1]);
                    document.querySelector(".dropbtn").innerHTML = season.name;
                    setEpisodeNUmber(1);
                    document.querySelector(".dropdown-content").style.display =
                      "none";
                  }}
                  key={id}
                >
                  {season.name}
                </p>
              ))}
            </div>
          </div>
        )}
        <div className="arrow-buttons-container">
          <i
            onClick={() => handleLeftClick()}
            className="fas fa-arrow-left"
          ></i>
          <i
            onClick={() => handleRightClick()}
            className="fas fa-arrow-right"
          ></i>
        </div>
      </div>
      <div ref={carouselRef} className="carousel__content">
        {header === "Cast" &&
          data &&
          data.data.cast.map((item, id) => (
            <div key={id} className="carousel__content__box">
              <img
                loading="lazy"
                src={
                  item.profile_path
                    ? `http://image.tmdb.org/t/p/w500//${item.profile_path}`
                    : "https://storage.needpix.com/rsynced_images/blank-profile-picture-973460_1280.png"
                }
                alt=""
              />
              <div className="carousel__content__box__name">
                <h3>{item.name}</h3>
                <p>{item.character}</p>
              </div>
            </div>
          ))}
        {header === "More like this" &&
          data &&
          data.data.results.map((item, id) => (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/detail", { state: item })}
              key={id}
              className="carousel__content__box"
            >
              <img
                loading="lazy"
                src={
                  item.poster_path
                    ? `http://image.tmdb.org/t/p/w500//${item.poster_path}`
                    : "https://storage.needpix.com/rsynced_images/blank-profile-picture-973460_1280.png"
                }
                alt=""
              />
            </div>
          ))}
        {header === "Episodes" &&
          !episodesData &&
          data &&
          data.data.episodes.map((item, id) => (
            <div
              onClick={() => setEpisodeNUmber(item.episode_number)}
              key={id}
              className={`carousel__content__box ${
                episodeNumber === id + 1 && "episodes--active"
              }`}
            >
              <img
                loading="lazy"
                src={
                  item.still_path
                    ? `http://image.tmdb.org/t/p/w500//${item.still_path}`
                    : "https://storage.needpix.com/rsynced_images/blank-profile-picture-973460_1280.png"
                }
                alt=""
              />
              <div className="carousel__content__box__name">
                <h3>{`S${data.data.season_number} E${item.episode_number}`}</h3>
                <p>{item.name}</p>
              </div>
            </div>
          ))}
        {header === "Episodes" &&
          episodesData &&
          episodesData.data.episodes.map((item, id) => (
            <div
              onClick={() => setEpisodeNUmber(item.episode_number)}
              key={id}
              className={`carousel__content__box ${
                episodeNumber === id + 1 && "episodes--active"
              }`}
            >
              <img
                loading="lazy"
                src={
                  item.still_path
                    ? `http://image.tmdb.org/t/p/w500//${item.still_path}`
                    : "https://storage.needpix.com/rsynced_images/blank-profile-picture-973460_1280.png"
                }
                alt=""
              />
              <div className="carousel__content__box__name">
                <h3>{`S${episodesData.data.season_number} E${item.episode_number}`}</h3>
                <p>{item.name}</p>
              </div>
            </div>
          ))}
      </div>
      {header === "Episodes" &&
        data &&
        data.data.episodes[episodeNumber - 1].overview && (
          <div className="episodes__overview">
            <p>Episode {episodeNumber} : </p>
            <p>
              {episodesData
                ? episodesData.data.episodes[episodeNumber - 1].overview
                : data.data.episodes[episodeNumber - 1].overview}
            </p>
          </div>
        )}
    </div>
  );
}
