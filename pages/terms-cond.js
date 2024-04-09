import React from "react";
import Footer from "../components/_App/Footer";
import Footer2 from "../components/_App/Footer2";
import Navbar from "../components/_App/Navbar";
import classes from "../styles/PageBanner.module.css";

const termscond = () => {
  return (
    <div>
      {" "}
      <Navbar />
      <div
        className="container"
        style={{ marginTop: "20px", overflow: "hidden" }}
      >
        <div className={`row ${classes.banner}`}>
          <div
            className="col-3"
            style={{ position: "absolute", top: "80px", left: "80px" }}
          >
            <h2>Terms {"&"} Conditions</h2>
          </div>
          <div
            className={`col-9 ${classes.bannerimg}`}
            style={{ position: "absolute", left: "650px" }}
          >
            <img src="/images/bannerImage.png" width="" />
          </div>
        </div>

        <div style={{ marginBottom: "40px", marginTop: "20px" }}>
          Contact us for the detailed terms and conditions of using the service.
        </div>
      </div>
      {/* <Footer /> */}
      <Footer2 />
    </div>
  );
};

export default termscond;
