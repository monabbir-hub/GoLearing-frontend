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

const CourselistRow = ({ category, id }) => {
  const [courses, setCourses] = useState([]);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    loadAllCourse();

  }, [id, category]);

  const loadAllCourse = async () => {
    setSpinner(true);
    let url = GetCourseEnd;
    if (id) url += `?category_id=${id}`;
    else url;
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        setCourses(res?.data);
        setSpinner(false);
        // console.log(category);
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      Toast("err", error?.response?.data?.msg || "Try again later!");
      setSpinner(false);
    }
  };
  return !spinner ? (
    <>
      <div style={{margin:"0 10px"}}>
        {courses.length > 0 ? (
          <Swiper
            spaceBetween={0}
            navigation={true}
            modules={[Navigation]}
            slidesPerView="auto"
            slidesPerGroup={1}
            className="courses_corousel"
          >
            {courses.map((c, idx) => (
                <SwiperSlide key={idx}>
                  <CourseCard1 courseData={c} />
                </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <h6 style={{ marginLeft: "30px", marginBottom: "60px" }}>
            No course found!
          </h6>
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

export default CourselistRow;
