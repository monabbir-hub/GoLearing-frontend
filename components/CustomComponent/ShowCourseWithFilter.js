import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GetCategoryEnd } from "../../utils/EndPoints";
import Toast from "../../utils/Toast";
import cButtonClasses from "../../styles/Button.module.css";
import { Form, Spinner } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CourselistRow from "./CourselistRow";
const ShowCourseWithFilter = ({ page }) => {
  const [spinner, setSpinner] = useState(false);
  const [filterKey, setFilterKey] = useState(); //show academic courses by default
  const [filter, setFilter] = useState([]);
  useEffect(() => {
    loadRootCategory();
  }, [filterKey]);

  const loadRootCategory = async () => {
    setSpinner(true);
    let url = GetCategoryEnd + "?root=true";
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        setFilter(res?.data?.data);
        setSpinner(false);
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      Toast("err", error?.response?.data?.msg || "Try again later!");
      setSpinner(false);
    }
  };
  return (
    <div>
      <div
        // className="container d-flex flex-row justify-content-center"
        className="row"
        style={{
          width: "100%",
          marginTop: "60px",
          display: "none",//"flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {filter.length > 0 &&
          filter.map((cat) => (
            <div
              className={`${cButtonClasses.normalButton} col-lg-3 col-sm-12 col-xs-12 col-md-3`}
              style={{
                width: "15rem",
                height: "4rem",
                fontSize: "18px",
                marginBottom: "10px",
                transition: "all .3s linear",
              }}
              onClick={() => {
                setFilterKey(cat._id);
              }}
              key={cat._id}
            >
              {cat.name}
            </div>
          ))}
      </div>
      {spinner && (
        <div className="my-5 py-5 text-center">
          <Spinner animation="border" />
        </div>
      )}
      <h5 style={{display:'block',textAlign:'center',padding:"4rem 0 0 0", fontSize:"2.5rem",fontWeight:"bold"}}>Featured Courses</h5>
      <div style={{ padding: "3rem 1rem" }}>
        <CourselistRow id={filterKey} />
      </div>
      <div style={{ maxWidth: "1440px",display:"none" }} className=" mx-auto ">
        {page === "home" && (
          <div className="text-center d-flex justify-content-center align-items-center">
            <Link href={`/courses`}>
              <a
                className={`${cButtonClasses.normalButton} d-flex justify-content-center align-items-center`}
                style={{ width: "110px", height: "50px", fontSize: "13px",marginBottom:"50px" }}
              >
                View all courses
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowCourseWithFilter;
