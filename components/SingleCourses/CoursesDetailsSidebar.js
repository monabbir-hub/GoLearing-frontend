import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../../providers/AuthProvider";
import { CreateOrderEnd } from "../../utils/EndPoints";
import Toast from "../../utils/Toast";

const ModalVideo = dynamic(() => import("react-modal-video"), {
  ssr: false,
});

const CoursesDetailsSidebar = ({ data, fullCourseData }) => {
  // Popup Video
  const [isOpen, setIsOpen] = React.useState(true);
  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  const [spinnerStatus, setSpinnerStatus] = React.useState(false);
  const auth = useAuth();

  // const handleOrder = async () => {
  //   if (!auth?.user?._id) {
  //     router.push("/profile-authentication");
  //     return;
  //   }
  //   setSpinnerStatus(true);
  //   try {
  //     const res = await axios.post(
  //       CreateOrderEnd,
  //       { course_id: data?._id },
  //       {
  //         headers: {
  //           "x-access-token": localStorage.getItem("x-access-token"),
  //         },
  //       }
  //     );
  //     if (res.status === 200) {
  //       Toast("success", "Order created!");
  //       window.open(res?.data?.redirect_link);

  //       setSpinnerStatus(false);
  //     } else throw new Error(res?.data?.msg);
  //   } catch (error) {
  //     Toast("err", error?.response?.data?.msg || "Try again later!");
  //     setSpinnerStatus(false);
  //   }
  // };

  return (
    <React.Fragment>
      {/* If you want to change the video need to update videoID */}
      <ModalVideo
        channel="youtube"
        isOpen={!isOpen}
        videoId={data?.preview}
        // videoId="https://www.youtube.com/watch?v=6v8djXa-IPQ"
        onClose={() => setIsOpen(!isOpen)}
        style={{ height: "auto", width: "90vw !important" }}
      />

      <div className="courses-details-info">
        <div className="image">
          <img
            src={data?.thumbnail || "/images/courses/banner-shape12.png"}
            alt="image"
            style={{ height: "14rem", width: "100%" }}
          />

          <Link href="#play-video">
            <a
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}
              className="link-btn popup-youtube"
            ></a>
          </Link>

          <div className="content">
            <i className="flaticon-play"></i>
            <span>Course Preview</span>
          </div>
        </div>

        <ul className="info">
          <li className="price">
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <i className="flaticon-tag"></i> Course fee
              </span>
              BDT {data?.price}
            </div>
          </li>
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <span className="pe-2">
                <i className="flaticon-teacher"></i> Mentor
              </span>
              <span className="text-muted">{data?.instructor_name}</span>
            </div>
          </li>
        </ul>

        <div className="btn-box">
          {!fullCourseData?.have_full_access ? (
            <button
              onClick={() =>
                typeof window !== "undefined" &&
                router.push(`/order/${data?._id}`)
              }
              className="default-btn w-100 d-flex justify-content-center align-items-center"
            >
              Enroll Now{" "}
              {spinnerStatus && (
                <Spinner animation="border" size="sm" className="ms-2" />
              )}
            </button>
          ) : (
            <button
              onClick={() => router.push(`/course-details/${data?._id}`)}
              className="default-btn w-100 d-flex justify-content-center align-items-center"
            >
              Continue course
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CoursesDetailsSidebar;
