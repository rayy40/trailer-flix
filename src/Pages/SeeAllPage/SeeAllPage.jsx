import React, { useRef, useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { useInfiniteQuery } from "react-query";
import { findGenreName } from "../../Helpers/findGenreName";
import SeeAllSkeleton from "../../Components/SkeletonLoading/SeeAllSkeleton";

export default function SeeAllPage({ genreMovie, genreTv }) {
  const location = useLocation();
  const history = useHistory();

  const fetchData = async (page = 1) => {
    const response = await fetch(`${location.state.url}&page=${page}`);
    return response.json();
  };

  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery(
    ["moviesData", location],
    ({ pageParam = 1 }) => fetchData(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.page + 1 <= lastPage.total_pages
          ? lastPage.page + 1
          : undefined;
      },
      refetchOnWindowFocus: false,
    }
  );

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (hasNextPage) fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage]
  );

  if (isLoading) {
    return <SeeAllSkeleton />;
  }

  return (
    <div className="see-all-page-container">
      <div className="see-all-page-container__header">
        <h2>{location && location.state.title}</h2>
      </div>
      <div className="see-all-page-container__body">
        {data &&
          data.pages.map((page) =>
            page.results.map((item, index) => {
              if (data.pages[0].results.length === index + 1) {
                return (
                  <div
                    onClick={() => {
                      window.matchMedia("(max-width: 1000px)").matches &&
                        history.push("/detail", item);
                    }}
                    ref={lastElementRef}
                    key={item.id}
                    className="item-box"
                  >
                    <img
                      src={
                        item.backdrop_path !== null
                          ? `http://image.tmdb.org/t/p/w500//${
                              window.matchMedia("(min-width: 1000px)").matches
                                ? item.backdrop_path
                                : item.poster_path
                            }`
                          : "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80"
                      }
                      alt={item.id + "-img"}
                    />
                    {window.matchMedia("(min-width: 1000px)").matches && (
                      <div className="item-box__details">
                        <div className="item-box__details__btn-container">
                          <button
                            onClick={() => history.push("/trailer", item)}
                            className="details-btn"
                          >
                            <i className="fas fa-play"></i>
                          </button>
                          <button
                            onClick={() => history.push("/detail", item)}
                            className="details-btn"
                          >
                            <i className="fas fa-info"></i>
                          </button>
                        </div>
                        <h5>
                          {location.state.url
                            .split("?")[0]
                            .split("/")
                            .includes("tv")
                            ? item.name
                            : item.title}
                        </h5>
                        <div className="item-box__details__genre">
                          {item.genre_ids.map((genre, id) => (
                            <p key={id}>
                              {findGenreName(
                                location.state.url
                                  .split("?")[0]
                                  .split("/")
                                  .includes("tv")
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
                );
              } else {
                return (
                  <div
                    onClick={() => {
                      window.matchMedia("(max-width: 1000px)").matches &&
                        history.push("/detail", item);
                    }}
                    key={item.id}
                    className="item-box"
                  >
                    <img
                      src={
                        item.backdrop_path !== null
                          ? `http://image.tmdb.org/t/p/w500//${
                              window.matchMedia("(min-width: 1000px)").matches
                                ? item.backdrop_path
                                : item.poster_path
                            }`
                          : "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80"
                      }
                      alt={item.id + "-img"}
                    />
                    {window.matchMedia("(min-width: 1000px)").matches && (
                      <div className="item-box__details">
                        <div className="item-box__details__btn-container">
                          <button
                            onClick={() => history.push("/trailer", item)}
                            className="details-btn"
                          >
                            <i className="fas fa-play"></i>
                          </button>
                          <button
                            onClick={() => history.push("/detail", item)}
                            className="details-btn"
                          >
                            <i className="fas fa-info"></i>
                          </button>
                        </div>
                        <h5>
                          {location.state.url
                            .split("?")[0]
                            .split("/")
                            .includes("tv")
                            ? item.name
                            : item.title}
                        </h5>
                        <div className="item-box__details__genre">
                          {item.genre_ids.map((genre, id) => (
                            <p key={id}>
                              {findGenreName(
                                location.state.url
                                  .split("?")[0]
                                  .split("/")
                                  .includes("tv")
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
                );
              }
            })
          )}
      </div>
    </div>
  );
}
