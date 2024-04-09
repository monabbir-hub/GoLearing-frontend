import React from "react";

const NewsArticleCard = () => {
  return (
    <div className="col">
      <div className="">
        <img src="/images/news.png" alt="image" />
      </div>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        <a href="">This is a news article</a>
      </p>
    </div>
  );
};

export default NewsArticleCard;
