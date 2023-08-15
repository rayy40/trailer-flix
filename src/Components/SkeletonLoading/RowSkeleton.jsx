import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function RowSkeleton() {
  return (
    <div className="row-outline">
      <div className="row-outline__header">
        <SkeletonTheme color={"#303030"} highlightColor={"#383838"}>
          <h3>
            <Skeleton width={"100px"} height={"20px"} />
          </h3>
        </SkeletonTheme>
      </div>
      <div className="row-outline__carousel--outline">
        <div className="row-outline__carousel--container">
          <div className="row-outline__carousel">
            {Array(20)
              .fill()
              .map((item, index) => (
                <SkeletonTheme
                  key={index}
                  color={"#303030"}
                  highlightColor={"#383838"}
                >
                  <div className="row-outline__carousel__item">
                    <Skeleton width={"100%"} height={"100%"} duration={1.5} />
                  </div>
                </SkeletonTheme>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
