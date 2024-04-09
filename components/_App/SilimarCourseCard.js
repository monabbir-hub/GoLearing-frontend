import React from "react";
import Link from "next/link";

function SilimarCourseCard({
  title = "Biology First Paper",
  duration = "1h",
  price = "$400",
  id="62bdbd1d8e4c850016d2bce8"
}) {
  return (
    <Link href={`/course/${id}`}>
      <div
        className="similar_courseCard"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px",
          borderRadius: "10px",
          margin: "15px 20px 15px 0",
          height: "80px",
          width: "350px",
          boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "80px",
            backgroundColor: "black",
            borderRadius: "10px",
            marginRight: "10px",
          }}
        ></div>
        <div style={{ textTransform: "capitalize", flex: "1" }}>
          <h6>
            {title} {`(${duration})`}
          </h6>
          <div style={{ color: "red" }}>{price}</div>
        </div>
      </div>
    </Link>
  );
}

export default SilimarCourseCard;
