import React from "react";
import Navbar from "../components/_App/Navbar";
import Footer from "../components/_App/Footer";
import classes from "../styles/PageBanner.module.css";
import Footer2 from "../components/_App/Footer2";

const refundpolicy = () => {
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
            <h2>Refund Policy</h2>
          </div>
          <div
            className={`col-9 ${classes.bannerimg}`}
            style={{ position: "absolute", left: "650px" }}
          >
            <img src="/images/bannerImage.png" width="" />
          </div>
        </div>
        <div style={{ marginBottom: "40px", marginTop: "20px" }}>
          A Refund Request will be considered valid only if it is made through
          an email to golearning2022@gmail.com or through the GO Learning App
          clearly specifying your email address and phone number used during
          registration within 3 days of the purchase.
          <br></br>
          <br></br>
          No refund request will be accepted after 3 days of the purchase. No
          refund is applicable for e-books and courses having 1 to 3 months
          subscriptions. Please contact customer support for a solution.
          <br></br>
          <br></br>
          Refunds shall be made through mobile financial services with which the
          purchase was made within 15 days of the refund request being
          successfully processed and approved by GO Learning. This confirmation
          will be sent to the user by email.
        </div>
      </div>
      {/* <Footer /> */}
      <Footer2 />
    </div>
  );
};

export default refundpolicy;
