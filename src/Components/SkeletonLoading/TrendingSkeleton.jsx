import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function TrendingSkeleton() {
  return (
    <div className="trending-container__content">
      <SkeletonTheme color={"#303030"} highlightColor={"#383838"}>
        <div className="trending-container__content__genre">
          <p>
            <Skeleton width={"10vw"} height={"100%"} count={"1"} />
          </p>
        </div>
        <h1>
          <Skeleton width={"25vw"} height={"100%"} />
        </h1>
        <p>
          <Skeleton width={"100%"} height={"100%"} count={"2"} />
          <Skeleton width={"60%"} height={"100%"} count={"1"} />
        </p>
      </SkeletonTheme>
    </div>
  );
}
