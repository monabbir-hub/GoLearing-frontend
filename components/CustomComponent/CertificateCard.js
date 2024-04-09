import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { AiFillCheckCircle } from "react-icons/ai";
import classes from "../../styles/CourseCard.module.css";
import { BiTimeFive } from "react-icons/bi";
import { BiVideo } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
const CertificateCard = () => {
  return (
    <div className={`container-fluid row ${classes.certificateCard}`}>
      <div className="col-3 ">
        <img src="/images/munz.png" alt="cert-image" width="100%" />
      </div>

      <div className="col-4">
        <div
          className="d-flex flex-column justify-content-around"
          style={{ minHeight: "140px" }}
        >
          <div>
            <p>
              <span style={{ fontWeight: "bold" }}>Course Title</span>
            </p>
          </div>
          <div style={{ textAlign: "justify", textJustify: "inter-word" }}>
            <p>Course Description</p>
          </div>
          <div>
            <p>Course Author</p>
          </div>
          <div className="d-flex flex-row justify-content-start">
            <div className="">
              <span style={{ fontWeight: "bold" }}>
                <BiTimeFive /> Time
              </span>
            </div>
            <div className="" style={{ marginLeft: "50px" }}>
              <span style={{ fontWeight: "bold" }}>
                <BiVideo /> Session
              </span>
            </div>
            <div className="" style={{ marginLeft: "50px" }}>
              <span style={{ fontWeight: "bold" }}>
                <AiOutlineStar /> Rating
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-5 col-md-12 d-flex flex-column justify-content-center">
        <div className="row">
          <div className="col-9">
            <ProgressBar now={60} label="60%" />
          </div>

          <div className="col-3" style={{ marginTop: "-10px" }}>
            <span style={{ marginRight: "15px" }}>
              <AiFillCheckCircle size="20px" color="grey" />
            </span>
            <img
              src="/images/downloadc.png"
              width="40%"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
