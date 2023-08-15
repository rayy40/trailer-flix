import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function CarouselSkeleton({ header }) {
  return (
    <div className="carousel-container">
      {window.matchMedia("(min-width: 1000px)").matches ? (
        <SkeletonTheme color={"#303030"} highlightColor={"#383838"}>
          <div
            className={`carousel__header ${
              header && "carousel__header--modifier"
            }`}
          >
            {header && (
              <div className="dropdown">
                <SkeletonTheme color={"#303030"} highlightColor={"#383838"}>
                  <Skeleton width={"100px"} height={"100%"} />
                </SkeletonTheme>
              </div>
            )}
            <Skeleton width={"75px"} height={"17.5px"} />
          </div>
        </SkeletonTheme>
      ) : (
        <div style={{ marginTop: "2em" }} className="skeleton-header"></div>
      )}
      <div className="carousel__content">
        {Array(20)
          .fill()
          .map((item, index) => (
            <SkeletonTheme
              key={index}
              color={"#303030"}
              highlightColor={"#383838"}
            >
              <div className="carousel__content__box">
                <Skeleton width={"100%"} height={"100%"} duration={1.2} />
              </div>
            </SkeletonTheme>
          ))}
      </div>
      {header && (
        <SkeletonTheme color={"#303030"} highlightColor={"#383838"}>
          <div className="episodes__overview">
            <p>
              <Skeleton width={"30px"} height={"100%"} />
            </p>
            <p>
              <Skeleton
                width={"100%"}
                height={"100%"}
                count={
                  window.matchMedia("(max-width: 700px)").matches ? "3" : "2"
                }
              />
            </p>
          </div>
        </SkeletonTheme>
      )}
    </div>
  );
}
