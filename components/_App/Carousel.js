import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import CourseCard from "../../components/Common/CourseCard1";

function Carousel(title, courseList) {
  return (
    <div className="silimar_courses" style={{ marginTop: "60px" }}>
      <h3 style={{ color: "black", paddingLeft: "80px", fontWeight: "bold" }}>
        {title}
      </h3>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="courses_corousel"
      >
        {courseList.map((course,key) => {
          return (
            <SwiperSlide key={key}>
              <CourseCard course={course}/>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Carousel;
