import Link from "next/link";
import React from "react";
import classes from "../../styles/CourseCard.module.css";
import { BiTimeFive } from "react-icons/bi";
import { BiVideo } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { ProgressBar } from "react-bootstrap";

const CourseCardSub = ({
  id,
  banner,
  title,
  description,
  author,
  videos,
  duration,
  rating,
  completion,
}) => {
  return (
    <div className={classes.myCourseCard}>
      <div className={`${classes.myCourseCardImage}`}>
        <img
          src={banner || "/images/courses/courses13.jpg"}
          alt="course-thumbnail"
          width="100%"
          // maxHeight="200px"
          style={{ borderRadius: "10px" }}
        />
      </div>
      <p>{title}</p>

      <div className="">
        {/* <ProgressBar now={completion} label={completion + "%"} /> */}
        {/* <ProgressBar now={60} label="60%" /> */}
      </div>
      <Link href={`/course/${id}`}>
        <div className={classes.continuecourse}>
          <p
            style={{
              color: "green",
              textAlign: "center",
              fontWeight: "normal",
              borderTop: "1px solid rgb(240, 240, 240)",
              cursor: "pointer",
              marginTop: "30px",
              padding: "3%",
            }}
          >
            Continue
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CourseCardSub;
