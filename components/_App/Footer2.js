import React from "react";
import Image from "next/dist/client/image";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { toast } from "react-toastify";

function Footer2(props) {
  const handleSubscribe = () => {
    toast.success("Subscribed!");
  };
  return (
    <div className="footer2">
      {/* <div className="footer_subscribe" style={{ margin: "20px" }}>
        <h1
          style={{
            color: "white",
            maxWidth: "600px",
            display: "block",
            textAlign: "center",
          }}
        >
          Subscribe To Get Update About Our New Courses
        </h1>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,.7)" }}>
          500+ Students Daily Learn With Go Learning
        </p>
        <div className="subscribe_input">
          <input type="email" placeholder="enter your email" />
          <button onClick={() => handleSubscribe()}>Subscribe</button>
        </div>
      </div> */}
      <div className="footer_nav">
        <div className="footer_nav_col">
          <div
            className="footer_logo"
            style={{
              position: "relative",
              height: "150px",
              width: "250px",
            }}
          >
            <Image
              src="/images/go-learning-favicon.png"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div style={{ display: "flex", margin: "0" }}>
            <a href="https://www.instagram.com/golearningbd/" target="_blank">
              <InstagramIcon
                style={{
                  width: "50px",
                  height: "50px",
                  color: "rgb(39,42,93)",
                }}
              />
            </a>
            <a href="https://www.facebook.com/golearningbd" target="_blank">
              <FacebookIcon
                style={{
                  width: "50px",
                  height: "50px",
                  color: "rgb(39,42,93)",
                }}
              />
            </a>
          </div>
          <p style={{ fontSize: "20px", marginTop: "10px", color: "black" }}>
            © 2022 GO Learning
          </p>
        </div>
        <div className="footer_nav_col" >
          <div className="footer_nav_col_title" >Courses</div>
          <Link href="/academic">
            <div>Academic</div>
          </Link>
          {/* <Link href="/course-list/62d46a2f4dc581001681fe7a">
            <div>Job Preparation</div>
          </Link> */}
          <Link href="/course-list/62d3241aee11570016070d6a">
            <div>Skill Development</div>
          </Link>
          <Link href="/courses">
            <div>All Courses</div>
          </Link>
        </div>
        <div className="footer_nav_col">
          <div className="footer_nav_col_title">Quick Links</div>
          <div>
            <Link href="/privacy-policy">
              <a target='_blank'>Privacy Policy</a>
            </Link>
          </div>
          <div>
            <Link href="/refund-policy">
              <a target='_blank'>Refund Policy</a>
            </Link>
          </div>
          <div>
            {/* <Link href="/terms-cond">
              <a target='_blank'>Terms {"&"} Conditions</a>
            </Link> */}
          </div>
          <div>
            <Link href="/about">
              <a target='_blank'>About Us</a>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="sis"
        style={{
          color: "black",
          display: "black",
          textAlign: "center",
          // textTransform: "capitalize",
          fontSize: "20px",
          marginBottom: "30px",
          fontWeight: "bold",
        }}
      >
        A sister concern of GO Technologies PLC.
      </div>
    </div>
  );
}

export default Footer2;
