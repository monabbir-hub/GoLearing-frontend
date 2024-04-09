import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  GetCategoryEnd,
} from "../utils/EndPoints";
import Toast from "../utils/Toast";
import {Spinner } from "react-bootstrap";
import Navbar from "../components/_App/Navbar";
import Footer2 from "../components/_App/Footer2";
import CourselistRow from "../components/CustomComponent/CourselistRow";
import bannerClasses from "../styles/PageBanner.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const courses = () => {
  const [courses, setCourses] = useState([]);
  const [otherCourses, setOtherCourses] = useState([]);
  const [category, setCategory] = useState("");
  const [rootCat, setRootCat] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [filter, setFilter] = useState([]);
  const [cat, setCat] = useState([]);

  useEffect(() => {
    loadRootCategory();
  }, []);

  const loadRootCategory = async () => {
    setSpinner(true);
    let url = GetCategoryEnd + "?root=true";
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        setRootCat(res?.data?.data);
        setFilter(res?.data?.data);
        // console.log(res);
        setSpinner(false);
      } else throw new Error(res?.data?.msg);
    } catch (error) {

      Toast("err", error?.response?.data?.msg || "Try again later!");
      setSpinner(false);
    }
  };
  return (
    <React.Fragment>
      <div>
        <Navbar />
        <div className="" style={{ overflow: "hidden"}}>
          <div className={`row ${bannerClasses.banner}`}>
            <div style={{ position: "absolute", top: "90px", left: "30px" }}>
              <h2 style={{ fontWeight: "bold" }}>All Courses</h2>
            </div>
            <div
              className={` ${bannerClasses.bannerimg}`}
              style={{
                position: "absolute",
                left: "700px",
                width: "400px",
              }}
            >
              <img src="/images/bannerImage.png" />
            </div>
          </div>
        </div>
        <div className="section-title" style={{ marginTop: "30px",width: "100%", }}>
          {/* <h2>{category}</h2> */}
        </div>

        <div style={{ maxWidth: "1440px"}}>
          <div className="" style={{ width: "100%",paddingRight:"0"}}>
            <div className="">
              <div className="">
                <div
                  style={{
                    marginBottom: "40px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Swiper
                    spaceBetween={10}
                    // loop={true}
                    className="allCourses"
                    modules={[Navigation]}
                  >
                    {filter.length > 0 &&
                      filter.map((cat) => (
                        <SwiperSlide
                          onClick={() => {
                            setRootCat([cat]);
                          }}
                          key={cat._id}
                        >
                          {cat.name}
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>

                {spinner && (
                  <div className="my-5 py-5 text-center">
                    <Spinner animation="border" />
                  </div>
                )}
              </div>
            </div>
          </div>
          {
            <div>
              {!spinner &&
                rootCat.length > 0 &&
                rootCat.map((c) => (
                  <div key={c._id} style={{ marginBottom: "30px",width:"100vw" }}>
                    <h3 style={{ marginLeft: "30px", fontWeight: "bold" }}>
                      {c.name}
                    </h3>
                    <CourselistRow category={c.name} id={c._id} key={c._id} />
                  </div>
                ))}
            </div>
          }
        </div>
        {/* <Footer /> */}
        <Footer2 />
      </div>
    </React.Fragment>
  );
};

export default courses;
