import Link from "next/link";
import React from "react";
import cCardClasses from "../../styles/CourseCard.module.css";
const CourseCard = ({ courseD }) => {
  //   console.log(title);
  return (
    <Link href={`/course/${courseD?._id}`}>
      <div className="container">
        <div className={cCardClasses.courseCard}>
          <div
            className="d-flex flex-column justify-content-between"
            style={{
              minHeight: "300px",
            }}
          >
            <div className="image">
              <img
                src={courseD?.thumbnail}
                style={{ width: "100%", height: "190px" }}
                alt="courses1"
              />
            </div>
            <div className="d-flex justify-content-between">
              <div className="">
                {" "}
                <span>Rating </span>
                {courseD?.rating?.average == 0
                  ? 5
                  : courseD?.rating?.average == 0}
                /5 (
                {courseD?.rating?.total_rating_count == 0
                  ? 1
                  : courseD?.rating?.total_rating_count}
                )
              </div>
              <div className="" style={{ display: "none" }}>
                {" "}
                <span>{courseD?.lessons} Videos </span>
              </div>
              <div className="">
                {" "}
                <span>{courseD?.duration}</span>
              </div>
            </div>
            <div>
              <span style={{ fontSize: "1.1rem" }}>{courseD?.title}</span>
            </div>
            <div className="d-flex justify-content-between">
              <div className="">
                <span style={{ color: "#F48C06" }}>{courseD?.price} TK</span>
              </div>
              <div className="">
                <Link href={`/course/${courseD?._id}`}>
                  Click to See Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
