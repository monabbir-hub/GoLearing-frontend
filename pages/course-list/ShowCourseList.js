import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  GetCategoryEnd,
  GetCourseEnd,
} from "../../utils/EndPoints";
import Toast from "../../utils/Toast";
import classes from "../../styles/CourseCat.module.css";
import {Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import CourselistRow from "../../components/CustomComponent/CourselistRow";
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import OthersCourseListRow from "../../components/CustomComponent/OthersCourseListRow";

const ShowCourseList = ({ routerId }) => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [otherCourses, setOtherCourses] = useState([]);
  const [category, setCategory] = useState("");
  const [rootCat, setRootCat] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [filter, setFilter] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [othersDisplay, setOthersDisplay] = useState(true);
  const [banner, setBanner] = useState("");
  useEffect(() => {
    loadRootCategory();
    loadCategory();
    loadAllCourse();
    // loadBannerImg();
    // loadOtherCourses();
  }, [routerId]);

  useEffect(() => {
    loadOtherCourses();
  }, [courses]);

  const loadCategory = async () => {
    if (routerId === undefined) return;
    setSpinner(true);
    let url = GetCategoryEnd + "?parent_id=" + routerId;
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        setSubCat(res?.data?.data);
        setFilter(res?.data?.data);
        setSpinner(false);
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      console.log(error);
      Toast("err", error?.response?.data?.msg || "Try again later!");
      setSpinner(false);
    }
  };
  const loadRootCategory = async () => {
    if (routerId === undefined) return;
    setSpinner(true);
    let url = GetCategoryEnd + "?_id=" + routerId;
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        setRootCat(res?.data?.data[0]);
        // setFilter(res?.data?.data);
        setSpinner(false);
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      console.log(error);
      Toast("err", error?.response?.data?.msg || "Try again later!");
      setSpinner(false);
    }
  };

  const loadAllCourse = async () => {
    if (routerId === undefined) return;
    setSpinner(true);
    let url = GetCourseEnd;
    url += `?category_id=${routerId}`;

    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        setCourses(res?.data);
        setSpinner(false);
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      Toast("err", error?.response?.data?.msg || "Try again later!");
      setSpinner(false);
    }
  };
  const loadOtherCourses = async () => {
    setOtherCourses(courses.filter((course) => course.category_id.length < 2));
  };

  // const loadBannerImg = async () => {
  //   if (routerId === "62d323cbee11570016070d58")
  //     setBanner("/images/AcademicBanner01.jpg");
  //   else if (routerId === "62d46a2f4dc581001681fe7a")
  //     setBanner("/images/Admission-01.jpg");
  //   else if (routerId === "62d3241aee11570016070d6a")
  //     setBanner("/images/Job_Prep-01.jpg");
  //   else if (routerId === "62d323eaee11570016070d61")
  //     setBanner("/images/Skill_Development-01.jpg");
  // };

  return (
    <div>
      <div className="">
        <div className={classes.courseCatBanner}>
          <img src={rootCat.banner} alt="courses5" />
          <p></p>
        </div>
      </div>
      <div className="section-title" style={{ marginTop: "30px" }}>
        <h2>{category}</h2>
      </div>

      <div>
        <div className="row justify-content-center" style={{ width: "100%" }}>
          <div className="col-md-12 col-12">
            <div
              style={{
                marginBottom: "40px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={20}
                // loop={true}
                navigation={true}
                className="allCourses"
                modules={[Navigation]}
              >
                {filter.length > 0 &&
                  filter.map((cat) => (
                    <SwiperSlide
                      onClick={() => {
                        setSubCat([cat]);
                        setOthersDisplay(false);
                      }}
                      key={cat._id}
                      // style={
                      //   subCat[0].name === cat.name
                      //     ? { color: "#f8b03c" }
                      //     : { color: "white" }
                      // }
                    >
                      {cat.name}
                    </SwiperSlide>
                  ))}
                <SwiperSlide
                  onClick={() => {
                    setSubCat("");
                    setOthersDisplay(true);
                  }}
                >
                  Others
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
        {spinner && (
          <div className="my-5 py-5 text-center">
            <Spinner animation="border" />
          </div>
        )}

        {
          <>
            {!spinner &&
              subCat.length > 0 &&
              subCat.map((c) => (
                <div key={c._id} style={{ marginBottom: "30px" }}>
                  <h3 style={{ marginLeft: "30px", fontWeight: "bold" }}>
                    {c.name}
                  </h3>
                  <CourselistRow category={c.name} id={c._id} key={c._id} />
                </div>
              ))}
            {!spinner && (
              <div
                style={{
                  display: `${othersDisplay ? "block" : "none"}`,
                  width: "100%",
                }}
              >
                <h3 style={{ marginLeft: "30px", fontWeight: "bold" }}>
                  Others
                </h3>
                <OthersCourseListRow
                  spinner={spinner}
                  courseList={otherCourses}
                />
              </div>
            )}
          </>
        }
      </div>
    </div>
  );
};

export default ShowCourseList;
