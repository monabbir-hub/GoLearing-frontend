import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetCourseEnd } from "../../utils/EndPoints";
import CourseCard from "./CourseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, AutoPlay } from "swiper";
import { Form, Spinner } from "react-bootstrap";
import Toast from "../../utils/Toast";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CourseCard1 from "../Common/CourseCard1";

const OthersCourseListRow = ({ courseList, spinner }) => {

  return !spinner ? (
    <>
      <div className="">
        {courseList.length > 0 ? (
          <Swiper
            spaceBetween={2}
            //   loop={true}
            navigation={true}
            modules={[Navigation]}
            className="courses_corousel home_carousel"
            breakpoints={{
              400: {
                width: 400,
                slidesPerView: 1,
              },
              // when window width is >= 640px
              640: {
                width: 640,
                slidesPerView: 2,
              },
              // when window width is >= 768px
              960: {
                width: 960,
                slidesPerView: 3,
              },
              1140: {
                width: 1140,
                slidesPerView: 3,
              },
            }}
          >
            {courseList.map((c, idx) => (
              <div className="" key={idx}>
                <SwiperSlide>
                  <CourseCard1 courseData={c} />
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        ) : (
          <h5 style={{ marginLeft: "30px", marginBottom: "60px" }}>
            No course found!
          </h5>
        )}
      </div>
    </>
  ) : (
    <>
      <div className="my-5 py-5 text-center">
        <Spinner animation="border" />
      </div>
    </>
  );
};

export default OthersCourseListRow;
