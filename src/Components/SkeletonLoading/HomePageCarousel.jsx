import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function HomePageCarousel() {
  return (
    <div className="home-details-container__cast">
      <SkeletonTheme color={"#303030"} highlightColor={"#383838"}>
        <div className="cast__header">
          <h3>
            <Skeleton width={"100px"} height={"100%"} />
          </h3>
        </div>
        <div className="cast__carousel">
          {Array(20)
            .fill()
            .map((item, index) => (
              <div key={index} className="cast__carousel__container">
                <Skeleton width={"100%"} height={"100%"} />
              </div>
            ))}
        </div>
      </SkeletonTheme>
    </div>
  );
}
