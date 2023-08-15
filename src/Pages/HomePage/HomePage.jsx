import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { requestCast, requests } from "../../Api/Requests";
import { findGenreName } from "../../Helpers/findGenreName";
import { useNavigate } from "react-router";
import HomePageCarousel from "../../Components/SkeletonLoading/HomePageCarousel";
import HomePageSkeleton from "../../Components/SkeletonLoading/HomePageSkeleton";

export default function HomePage({ genreMovie, genreTv }) {
  const [randomNumber, setRandomNumber] = useState(0);
  const carouselRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 21));
  }, []);

  const { data, isLoading } = useQuery(
    "homePageData",
    () => axios(requests.getTrending),
    { refetchOnWindowFocus: false }
  );

  const { data: cast, isLoading: isCastLoading } = useQuery(
    ["castData", data],
    () =>
      axios(
        requestCast(
          data.data.results[randomNumber].media_type === "movie"
            ? "movie"
            : "tv",
          data.data.results[randomNumber].id
        )
      ),
    {
      refetchOnWindowFocus: false,
      enabled: !!data,
    }
  );

  const slideLeft = () => {
    if (carouselRef.current.scrollLeft !== 0) {
      carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
    }
  };

  const slideRight = () => {
    carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
  };

  if (cast && cast.data.cast.length > 39) {
    cast.data.cast.splice(40);
  }

  if (isLoading) {
    return <HomePageSkeleton />;
  }
  return (
    <div className="home-container__outline">
      <div className="home-container">
        <div
          style={{
            backgroundImage: data.data.results[randomNumber]
              ? `url(http://image.tmdb.org/t/p/original//${data.data.results[randomNumber].backdrop_path})`
              : "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className="home-container__background-img"
        ></div>
        <div className="home-container__content">
          <h1>
            {data.data.results[randomNumber].media_type === "movie"
              ? data.data.results[randomNumber].title
              : data.data.results[randomNumber].name}
          </h1>
          <div className="home-container__content__genre">
            {data.data.results[randomNumber].genre_ids.map((genre, id) => (
              <p key={id}>
                {findGenreName(
                  data.data.results[randomNumber].media_type === "movie"
                    ? genreMovie
                    : genreTv,
                  genre
                )}
              </p>
            ))}
          </div>
          <button
            onClick={() =>
              navigate("/trailer", { state: data.data.results[randomNumber] })
            }
            className="play-btn"
          >
            <i className="fas fa-play"></i>
            <p>Play</p>
          </button>
        </div>
        <div className="arrow-down">
          <i
            onClick={() =>
              document.querySelector(".home-details-container").scrollIntoView({
                behavior: "smooth",
              })
            }
            className="fas fa-chevron-down"
          ></i>
        </div>
      </div>
      <div className="home-details-container">
        <div className="home-details-container__poster">
          <img
            loading="eager"
            src={`http://image.tmdb.org/t/p/w500//${data.data.results[randomNumber].poster_path}`}
            alt={
              data.data.results[randomNumber].media_type === "movie"
                ? data.data.results[randomNumber].title
                : data.data.results[randomNumber].name + "-img"
            }
          />
        </div>
        <div className="home-details-container__content">
          <div className="home-details-container__content__genre">
            {data.data.results[randomNumber].genre_ids.map((genre, id) => (
              <p key={id}>
                {findGenreName(
                  data.data.results[randomNumber].media_type === "movie"
                    ? genreMovie
                    : genreTv,
                  genre
                )}
              </p>
            ))}
          </div>
          <h1>
            {data.data.results[randomNumber].media_type === "movie"
              ? data.data.results[randomNumber].title
              : data.data.results[randomNumber].name}
          </h1>
          <p>{data.data.results[randomNumber].overview}</p>
        </div>
        {isCastLoading ? (
          <HomePageCarousel />
        ) : (
          <div className="home-details-container__cast">
            <div className="cast__header">
              <h3>Cast </h3>
              {cast.data.cast.length > 8 && (
                <div className="arrow-buttons-container">
                  <i
                    onClick={() => slideLeft()}
                    className="fas fa-arrow-left"
                  ></i>
                  <i
                    onClick={() => slideRight()}
                    className="fas fa-arrow-right"
                  ></i>
                </div>
              )}
            </div>
            <div ref={carouselRef} className="cast__carousel">
              {cast.data.cast.map((person, id) => (
                <div key={id} className="cast__carousel__container">
                  <img
                    loading="lazy"
                    src={
                      person.profile_path
                        ? `http://image.tmdb.org/t/p/w500//${person.profile_path}`
                        : "https://storage.needpix.com/rsynced_images/blank-profile-picture-973460_1280.png"
                    }
                    alt=""
                  />
                  <div className="cast__carousel__container__name">
                    <h3>{person.name}</h3>
                    <p>{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      )
    </div>
  );
}
