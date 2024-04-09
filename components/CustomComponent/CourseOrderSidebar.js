import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useCourseDetails } from "../../providers/CourseDetails";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import Image from "next/image";

import {
  ApplyCoupon,
  FullCourseTreeEnd,
  GetCourseEnd,
} from "../../utils/EndPoints";
import cCardClasses from "../../styles/Ordercard.module.css";
import { Button } from "react-bootstrap";
import { IoMdAddCircle } from "react-icons/io";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { API } from "../../api";
import { useForm } from "react-hook-form";
import ManageCouponProvider, {
  useManageCoupon,
} from "../../providers/ManageCouponProvider";
const CourseOrderSidebar = ({ courseId , setOfferPrice }) => {
  const [courseData, setCourseData] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState();
  useEffect(() => {
    loadCourseDetails();
  }, [courseId]);
  const { appliedCoupon, setAppliedCoupon } = useManageCoupon();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        ApplyCoupon +
          "?coupon=" +
          coupon +
          "&course_price=" +
          courseData?.price,
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );
      if (response.status === 200) {
        toast.success("successfully applied coupon");
      }
      //   console.log(response?.data?.data?.discounted_price);
      setDiscountedPrice(response?.data?.data?.discounted_price);
      setOfferPrice(response?.data?.data?.discounted_price);
      setAppliedCoupon(response?.data?.data?.coupon?.coupon);
    } catch (err) {
      toast.error(err?.response?.data?.msg || err?.message);
    }
  };

  const loadCourseDetails = async () => {
    try {
      const res = await axios.get(GetCourseEnd + `?_id=${courseId}`);

      if (res.status === 200) {
        // console.log(res);
        setCourseData(res?.data[0]);
        // loadFullCourse(res?.data[0]?._id);
      } else
        throw new Error(
          res?.data?.msg || "Something went wrong, can't load course"
        );
    } catch (error) {
      // Toast('err', error?.response?.data?.msg)
    }
  };

  return (
    // <div className={cCardClasses.courseCard}>
    //   <div
    //     className="d-flex flex-column justify-content-between"
    //     style={{ minHeight: "388px" }}
    //   >
    //     <div className="image" style={{ margin: "" }}>
    //       <img
    //         src={courseData?.thumbnail}
    //         style={{ width: "100%" }}
    //         alt="courses1"
    //       />
    //     </div>
    //     <div className="d-flex justify-content-between">
    //       {/* <div className="">
    //         {" "}
    //         <span>Rating </span>
    //         {courseData?.rating?.average == 0
    //           ? 5
    //           : courseData?.rating?.average == 0}
    //         /5 (
    //         {courseData?.rating?.total_rating_count == 0
    //           ? 1
    //           : courseData?.rating?.total_rating_count}
    //         )
    //       </div> */}
    //       <div className="" style={{ display: "block" }}>
    //         {" "}
    //         <span>{courseData?.lessons} Videos </span>
    //       </div>
    //       <div className="">
    //         {" "}
    //         <span>{courseData?.duration}</span>
    //       </div>
    //     </div>
    //     <div>
    //       <span style={{ fontSize: "1.1rem" }}>{courseData?.title}</span>
    //     </div>
    //     <div className="d-flex justify-content-between">
    //       <div className="">
    //         <span style={{ color: "#F48C06" }}>
    //           Price: {courseData?.price} TK
    //         </span>
    //       </div>
    //     </div>
    //     <div
    //       className="d-flex justify-content-start"
    //       style={{ paddingTop: "10px", paddingBottom: "10px" }}
    //     >
    //       <div className="">
    //         <span style={{ color: "#F48C06", marginRight: "10px" }}>
    //           Add Coupon
    //         </span>
    //       </div>
    //       <form onSubmit={handleSubmit}>
    //         <div>
    //           <input
    //             type="text"
    //             // value={coupon}
    //             onChange={(e) => setCoupon(e.target.value)}
    //             style={{
    //               marginRight: "10px",
    //               width: "70%",
    //               display: "inline-block",
    //             }}
    //             className="form-control"
    //           />
    //           <button className="btn btn-warning">
    //             {" "}
    //             <IoMdAddCircle
    //               size={20}
    //               color="white"
    //               style={{ cursor: "pointer" }}
    //             />
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //     {discountedPrice ? (
    //       <div className="">
    //         <span style={{ color: "#c21010" }}>
    //           Discounted Price: {discountedPrice} TK
    //         </span>
    //       </div>
    //     ) : (
    //       <span style={{ color: "#c21010" }}>Discounted Price: ---</span>
    //     )}
    //   </div>
    // </div>
    <div
      className="course_card"
      style={{
        border: "1px solid rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        borderRadius: "10px",
        cursor: "pointer",
        width: "100%",
        height: "500px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "13rem",
          overflow: "hidden",
          backgroundColor: "black",
        }}
      >
        {courseData?.thumbnail && (
          <Image
            loader={() => courseData?.thumbnail}
            src={courseData?.thumbnail}
            layout="fill"
            placeholder="blur"
            blurDataURL={courseData?.thumbnail}
          />
        )}
      </div>
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="course_info">
            <div>
              <VideocamOutlinedIcon
                style={{ fontSize: "1.3rem", marginRight: "5px" }}
              />
            </div>
            <div>{courseData?.total_lecture} Lectures</div>
          </div>
          <div className="course_info">
            <div>
              <AccessTimeOutlinedIcon
                style={{ fontSize: "1.3rem", marginRight: "5px" }}
              />
            </div>
            <div>{courseData?.duration}</div>
          </div>
        </div>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.3rem",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {courseData?.title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between", }}>
                <p style={{ fontWeight: "bold", marginRight: "20px" }}>Price</p>
                <p style={{  Weight: "bold", textAlign: "right",fontSize: "1.3rem",  }}>
                    <span style={{ color:'gray', Weight: "bold",textDecoration: "line-through" }}>৳{courseData?.original_price}</span>
                    <b style={{ color:'#F7B03C'}}>{"  "}৳{courseData?.price}</b>
                </p>
            </div>
        </div>
        <div
          className="d-flex justify-content-start align-items-center"
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          <div className="">
            <span
              style={{
                fontWeight: "bold",
                color: "#F48C06",
                marginRight: "10px",
              }}
            >
              Add Coupon
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                // value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                style={{
                  marginRight: "10px",
                  width: "70%",
                  display: "inline-block",
                }}
                className="form-control"
              />
              <button className="btn btn-warning">
                {" "}
                <IoMdAddCircle
                  size={20}
                  color="white"
                  style={{ cursor: "pointer" }}
                />
              </button>
            </div>
          </form>
        </div>
        {discountedPrice ? (
          <div className="">
            <span style={{ fontWeight: "bold", color: "#c21010" }}>
              After applying promo: {discountedPrice} TK
            </span>
          </div>
        ) : (
          <span style={{ fontWeight: "bold", color: "#c21010",display:"none" }}>
            Discounted Price: ---
          </span>
        )}
      </div>
    </div>
  );
};
// </div>
//   );
// };

export default CourseOrderSidebar;
