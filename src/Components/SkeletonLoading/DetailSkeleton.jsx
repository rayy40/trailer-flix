import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function DetailSkeleton() {
  console.log();
  return (
    <SkeletonTheme color={"#303030"} highlightColor={"#383838"}>
      <div className="detail-page-container">
        <div className="detail-page-container__go-back">
          <Skeleton width={"30px"} height={"100%"} />
        </div>
        <div className="detail-page-container__info">
          <div className="detail-page-container__info__poster">
            <Skeleton width={"100%"} height={"100%"} />
          </div>
          <div className="detail-page-container__info__overview">
            <h2>
              <Skeleton
                width={
                  window.matchMedia("(max-width: 500px)").matches
                    ? "120px"
                    : "12.5vw"
                }
                height={"40px"}
                count={
                  window.matchMedia("(max-width: 500px)").matches ? "2" : "1"
                }
              />
            </h2>
            <div className="overview--details">
              <p>
                <Skeleton
                  width={"calc(1.5vw + 0.15rem)"}
                  height={"10px"}
                  count={"1"}
                />
              </p>
            </div>
            <div className="genre">
              {Array(3)
                .fill()
                .map((item, index) => (
                  <p key={index}>
                    <Skeleton width={"calc(1.6vw + 0.5rem)"} height={"10px"} />
                  </p>
                ))}
            </div>
            {window.matchMedia("(min-width: 1000px)").matches && (
              <p className="overview">
                <Skeleton width={"450px"} height={"15px"} count={4} />
              </p>
            )}
          </div>
        </div>
        {window.matchMedia("(max-width: 1000px)").matches && (
          <div className="plot-summary">
            <p>
              <Skeleton width={"50px"} height={"100%"} />
            </p>
            <p className="overview">
              <Skeleton width={"100%"} height={"100%"} count={4} />
            </p>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
}
