import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import CourseCard from "../CustomComponent/CourseCard";
import cButtonClasses from "../../styles/Button.module.css";
const CoursesArea = ({ courses }) => {
  return (
    <div className="courses-area bg-f5f7fa pt-100 pb-70">
      <div className="container">
        <div className="section-title">
          <span className="sub-title">Go At Your Full Pace</span>
          <h2>All Courses</h2>
        </div>

        <div
          // className={`d-flex flex-row justify-content-center`}
          className="row"
          style={{ justifyContent: "center", marginBottom: "20px" }}
        >
          <div
            className={`col-lg-2 col-md-5 col-sm-11 col-xs-11 ${cButtonClasses.normalButton}`}
            style={{ marginBottom: "10px" }}
          >
            <span>All Courses</span>
          </div>
          <div
            className={`col-lg-2 col-md-5 col-sm-11 col-xs-11 ${cButtonClasses.normalButton}`}
            style={{ marginBottom: "10px" }}
          >
            <span>Language Learning</span>
          </div>
          <div
            className={`col-lg-2 col-md-5 col-sm-11 col-xs-11 ${cButtonClasses.normalButton}`}
            style={{ marginBottom: "10px" }}
          >
            <span>Skill Development</span>
          </div>
          <div
            className={`col-lg-2 col-md-5 col-sm-11 col-xs-11 ${cButtonClasses.normalButton}`}
            style={{ marginBottom: "10px" }}
          >
            <span>Class 1-12</span>
          </div>
          <div
            className={`col-lg-2 col-md-5 col-sm-11 col-xs-11 ${cButtonClasses.normalButton}`}
            style={{ marginBottom: "10px" }}
          >
            <span>More Courses</span>
          </div>
        </div>

        <div
          className=""
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gridGap: "15px",
          }}
        >
          {courses
            ?.filter(
              (f) =>
                f?.short_id === "Varsity" ||
                f?.short_id === "Medical" ||
                f?.short_id === "Engineering" ||
                f?.short_id === "VarsityPreAdmission" ||
                f?.short_id === "MathMagic"
            )
            ?.reverse()
            ?.map((c, idx) => (
              // <div key={idx} className="single-courses-item-box ">
              //   <div
              //     className="courses-image d-flex justify-content-center align-items-center"
              //     style={{ height: "250px" }}
              //   >
              //     <Link href={`/course/${c?.short_id}`}>
              //       <a className="d-block image ">
              //         <img
              //           src={c.banner || "/images/courses/courses13.jpg"}
              //           alt="image"
              //           style={{
              //             width: "100%",
              //           }}
              //         />
              //       </a>
              //     </Link>
              //   </div>
              //   <div
              //     className="courses-content"
              //     style={{
              //       height: `12rem`,
              //     }}
              //   >
              //     <h3>
              //       <Link href={`/course/${c?.short_id}`}>
              //         <a>{c?.title}</a>
              //       </Link>
              //     </h3>
              //     <h3 className="text-center my-3">BDT {c?.price}</h3>
              //   </div>
              //   <Link href={`/course/${c?.short_id}`}>
              //     <a
              //       className="default-btn w-100"
              //       style={{ position: "relative", bottom: "-10px" }}
              //     >
              //       See Details
              //       <span></span>
              //     </a>
              //   </Link>

              // </div>
              <div>
                <CourseCard courseD={c} />
              </div>
            ))}
        </div>
      </div>

      <div className="shape16">
        <img src="/images/shape15.png" alt="image" />
      </div>

      <div className="text-center my-5  d-flex justify-content-center align-items-center ">
        <Link href={`/courses`}>
          <a className="default-btn d-flex justify-content-center align-items-center">
            View all courses <FaArrowRight className="ms-3" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CoursesArea;
