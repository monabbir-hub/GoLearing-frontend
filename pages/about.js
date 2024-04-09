import React from "react";
import Navbar from "../components/_App/Navbar";
import Footer from "../components/_App/Footer";
import classes from "../styles/PageBanner.module.css";
import Footer2 from "../components/_App/Footer2";

const about = () => {
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
            <h2>About us</h2>
          </div>
          <div
            className={`col-9 ${classes.bannerimg}`}
            style={{ position: "absolute", left: "650px" }}
          >
            <img src="/images/bannerImage.png" width="" />
          </div>
        </div>

        <div style={{ marginBottom: "40px", marginTop: "20px" }}>
          <h4 style={{ fontWeight: "bold" }}>About</h4>
          <p
            style={{
              marginBottom: "40px",
              marginTop: "20px",
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            Go Technologies Limited is a Bangladesh-based educational technology
            company that focuses to provide lifelong learning by utilizing
            technology to be future-ready for Fourth Industrial Revolution
            (4IR). Today the world is moving faster than ever in both the real
            and virtual reality world with spectacular Artificial Intelligence
            (AI), Blockchain and nanotechnologies. Go Technologies Limited seeks
            to make learning fun and interactive that would enable generations
            to be empowered with lifelong learning.{" "}
          </p>

          <h4 style={{ fontWeight: "bold" }}>Mission</h4>
          <p
            style={{
              marginBottom: "40px",
              marginTop: "20px",
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            Provide inclusive and interactive lifelong learning to blend with
            technology to be future-ready for the 4IR.
          </p>

          <h4 style={{ fontWeight: "bold" }}>Goals</h4>
          <ul
            style={{
              marginBottom: "40px",
              marginTop: "20px",
              textAlign: "justify",
              textJustify: "inter-word",
              color: "grey",
            }}
          >
            <li>
              Ensure inclusive and quality education to promote lifelong
              learning.
            </li>
            <li>
              Make the education process interactive and accessible to all.{" "}
            </li>
            <li>Digitalize the education sector and train the educators. </li>
            <li>Improve the education system for people with special needs.</li>
            <li>
              To be a part of the new national curriculum to make a digital
              platform for master training program spreading on digital
              platform.
            </li>
            <li>
              Helping Bangladesh national curriculum system with proper research
              centre.
            </li>
            <li>
              Providing digital learning content to solve national problems from
              the root.{" "}
            </li>
          </ul>

          <h4 style={{ fontWeight: "bold" }}>Vision</h4>
          <p
            style={{
              marginBottom: "40px",
              marginTop: "20px",
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            We are on a quest to build a world providing lifelong learning
            opportunities that empower individuals to be self-aware and
            contribute to making the world a better place and make the education
            system of Bangladesh, more competitive with international
            perspective.
          </p>
        </div>
      </div>
      {/* <Footer /> */}
      <Footer2 />
    </div>
  );
};

export default about;
