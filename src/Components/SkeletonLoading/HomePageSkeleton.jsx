import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function HomePageSkeleton() {
  return (
    <div
      style={{ backgroundColor: "#121212" }}
      className="home-container__outline"
    >
      <SkeletonTheme color={"#303030"} highlightColor={"#383838"}>
        <div className="home-container">
          <div className="home-container__content">
            <h1>
              <Skeleton width={"20vw"} height={"100%"} />
            </h1>
            <div className="home-container__content__genre">
              {Array(3)
                .fill()
                .map((item, index) => (
                  <p key={index}>
                    <Skeleton width={"50px"} height={"15px"} />
                  </p>
                ))}
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
}
