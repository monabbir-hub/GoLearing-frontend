import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { CreateOrderEnd } from "../../utils/EndPoints";
import Toast from "../../utils/Toast";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";

const CoursesDetailsSidebarTwo = ({ data }) => {
  const router = useRouter();

  const [spinnerStatus, setSpinnerStatus] = useState(false);

  const handleOrder = async () => {
    setSpinnerStatus(true);
    try {
      const res = await axios.post(
        CreateOrderEnd,
        { course_id: data?._id },
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );
      if (res.status === 200) {
        Toast("success", "Order created!");
        router.push(res?.data?._link || "/");
        setSpinnerStatus(false);
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      Toast("err", error?.response?.data?.msg || "Try again later!");
    }
  };

  return (
    <div className="courses-sidebar-sticky">
      <div className="courses-sidebar-information">
        <ul className="info">
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-teacher"></i> Instructor
              </span>
              {data?.instructor_name}
            </div>
          </li>
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-time"></i> Duration
              </span>
              {data?.duration} Hour
            </div>
          </li>
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-distance-learning"></i> Lessons
              </span>
              {data?.lessons}
            </div>
          </li>

          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-lock"></i> Access
              </span>
              {data?.access}
            </div>
          </li>
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-quiz"></i> Quizzes
              </span>
              Yes
            </div>
          </li>
        </ul>

        <div className="btn-box">
          <button
            onClick={() => handleOrder()}
            className="default-btn w-100 d-flex justify-content-center align-items-center"
          >
            Enroll Now{" "}
            {spinnerStatus && (
              <Spinner animation="border" size="sm" className="ms-2" />
            )}
          </button>
          {/* <Link href='#' >
            <a>
              Enroll Now
              <span></span>
            </a>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default CoursesDetailsSidebarTwo;
