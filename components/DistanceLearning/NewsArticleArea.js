import React from "react";
import NewsArticleCard from "../CustomComponent/NewsArticleCard";

const NewsArticleArea = () => {
  return (
    <div
      className="container"
      style={{
        marginTop: "80px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>News Article</h2>
      <div className="row" style={{ textAlign: "center" }}>
        {Array.from(Array(6), (e, i) => {
          return (
            <div
              className="col-lg-4 col-sm-12 col-md-6 col-xs-12"
              style={{ padding: "1%" }}
            >
              <NewsArticleCard />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsArticleArea;
