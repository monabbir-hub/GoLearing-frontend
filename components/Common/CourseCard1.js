import React, { useEffect, useState } from "react";
import Image from "next/image";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Link from "next/link";

function CourseCard1({ courseData }) {
  return (
    <Link href={`/course/${courseData?._id}`}>
      <div
        className="course_card"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          borderRadius: "10px",
          cursor: "pointer",
          width: "100%",
          height: "100%",
        }}
      >
        {courseData && (
          <div>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "13rem",
                minHeight: "12rem",
                overflow: "hidden",
                backgroundColor: "black",
              }}
            >
              {courseData.thumbnail && (
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
              <div style={{ display: "flex", justifyContent: "flex-end",alignItems:"center",gap:".75rem" }}>
                <div
                  style={{
                    fontWeight:"bold",
                    color:
                      courseData?.price !== courseData?.original_price
                        ? "gray"
                        : "#F7B03C",
                    fontSize:
                      courseData?.price === courseData?.original_price
                        ? "1.3rem"
                        : ".9rem",
                    textDecoration:
                      courseData?.price === courseData?.original_price
                        ? "none"
                        : "line-through",
                  }}
                >
                  ৳{courseData.original_price}
                </div>
                <div
                  style={{
                    display:
                      courseData?.price === courseData?.original_price
                        ? "none"
                        : "flex",
                    fontWeight: "bold",
                    color: "#F7B03C",
                    fontSize: "1.3rem",
                  }}
                >
                  ৳{courseData.price}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default CourseCard1;
