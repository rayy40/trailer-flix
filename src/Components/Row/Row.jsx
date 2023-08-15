import React, { useRef, useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { findGenreName } from "../../Helpers/findGenreName";
import { slideLeft, slideRight, setTabs } from "../../Helpers/utilities";
import RowSkeleton from "../SkeletonLoading/RowSkeleton";

export default function Row({ title, fetchUrl, genreMovie, genreTv }) {
  const indicatorsRef = useRef();
  const carouselRef = useRef();
  const activeRef = useRef();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const { data, isLoading } = useQuery(
    ["rowData", fetchUrl],
    () => axios(fetchUrl),
    {
      refetchOnWindowFocus: false,
      enabled: !!fetchUrl,
    }
  );

  useEffect(() => {
    if (!toggle && indicatorsRef.current !== undefined) {
      setToggle(true);
      indicatorsRef.current !== undefined &&
        setTabs(carouselRef, indicatorsRef);
    }
  }, [data, toggle]);

  if (isLoading) {
    return <RowSkeleton />;
  }
  return (
    <div className="row-outline">
      <div className="row-outline__header">
        <div className="title">
          <h3>{title}</h3>
          <div
            onClick={() =>
              navigate("/seeall", {
                state: { pageParams: data.data, title: title, url: fetchUrl },
              })
            }
            className="explore-all"
          >
            <p>Explore All</p>
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
        <div
          ref={indicatorsRef}
          className="row-outline__header__indicators active"
        ></div>
      </div>
      <div className="row-outline__carousel--outline">
        <button
          onClick={() => slideLeft(carouselRef, indicatorsRef)}
          className="slider-btn btn-left"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <div ref={carouselRef} className="row-outline__carousel--container">
          <div ref={activeRef} className="row-outline__carousel">
            {data.data.results.map((item, id) => (
              <div
                onClick={() => {
                  window.matchMedia("(max-width: 1000px)").matches &&
                    navigate("/detail", { state: item });
                }}
                key={id}
                className="row-outline__carousel__item"
              >
                <img
                  loading="lazy"
                  src={
                    item.backdrop_path !== null
                      ? `http://image.tmdb.org/t/p/w500//${
                          window.matchMedia("(min-width: 1000px)").matches
                            ? item.backdrop_path
                            : item.poster_path
                        }`
                      : "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80"
                  }
                  alt=""
                />
                {window.matchMedia("(min-width: 1000px)").matches && (
                  <div className="row-outline__carousel__item__details">
                    <div className="row-outline__carousel__item__details__btn-container">
                      <button
                        onClick={() => navigate("/trailer", { state: item })}
                        className="details-btn"
                      >
                        <i className="fas fa-play"></i>
                      </button>
                      <button
                        onClick={() => navigate("/detail", { state: item })}
                        className="details-btn"
                      >
                        <i className="fas fa-info"></i>
                      </button>
                    </div>
                    <h5>
                      {fetchUrl.split("?")[0].split("/").includes("tv")
                        ? item.name
                        : item.title}
                    </h5>
                    <div className="row-outline__carousel__item__details__genre">
                      {item.genre_ids.map((genre, id) => (
                        <p key={id}>
                          {findGenreName(
                            fetchUrl.split("?")[0].split("/").includes("tv")
                              ? genreTv
                              : genreMovie,
                            genre
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => slideRight(carouselRef, indicatorsRef)}
          className="slider-btn btn-right"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
