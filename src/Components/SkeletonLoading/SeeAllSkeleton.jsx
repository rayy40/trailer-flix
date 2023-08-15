import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function RowSkeleton() {
  return (
    <div className="see-all-page-container">
      <SkeletonTheme color={"#303030"} highlightColor={"#383838"}>
        <div className="seea-all-page-container__header">
          <h2 style={{ marginLeft: "16px" }}>
            <Skeleton width={"100px"} height={"25px"} />
          </h2>
        </div>
      </SkeletonTheme>
      <div className="see-all-page-container__body">
        {Array(25)
          .fill()
          .map((item, index) => (
            <SkeletonTheme
              key={index}
              color={"#303030"}
              highlightColor={"#383838"}
            >
              <div className="item-box">
                <Skeleton width={"100%"} height={"100%"} duration={1.5} />
              </div>
            </SkeletonTheme>
          ))}
      </div>
    </div>
  );
}
