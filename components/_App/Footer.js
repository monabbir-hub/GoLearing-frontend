import React from "react";
import Image from "next/dist/client/image";
import Link from "next/link";
import { toast } from "react-toastify";

function Footer2(props) {
  const handleSubscribe = () => {
    toast.success("Subscribed!");
  };
  return (
    <div className="footer2" style={{ marginTop: "50px" }}>
      <div className="footer_subscribe" style={{ margin: "20px" }}>
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
      </div>
      <div className="footer_nav">
        <div style={{ width: "150px" }}>
          <div
            style={{
              position: "relative",
              height: "40px",
              width: "80px",
              marginBottom: "15px",
            }}
          >
            <Image src="/images/go-learning-favicon.png" layout="fill" />
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                position: "relative",
                height: "30px",
                width: "30px",
                marginRight: "10px",
              }}
            >
              <Image src="/images/fb.png" layout="fill" />
            </div>
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "1000px",
                overflow: "hidden",
                backgroundColor: "rgb(246,176,60)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "12px",
                  width: "12px",
                }}
              >
                <Image src="/images/instagram.png" layout="fill" />
              </div>
            </div>
          </div>
          <p style={{ fontSize: "12px", marginTop: "10px", color: "black" }}>
            @2022 GoLearning
          </p>
          <p style={{ fontSize: "12px", color: "black" }}>
            Go-Learning is a registered trademark
          </p>
        </div>
        <div className="footer_nav_col">
          <div className="footer_nav_col_title">Courses</div>
          <div>Classroom courses</div>
          <div>Virtual classroom courses</div>
          <div>Video Courses</div>
          <div>Offline Courses</div>
        </div>
        <div className="footer_nav_col">
          <div className="footer_nav_col_title">Courses</div>
          <div>Classroom courses</div>
          <div>Virtual classroom courses</div>
          <div>Video Courses</div>
          <div>Offline Courses</div>
        </div>
        {/* <div className="footer_nav_col">
          <div className="footer_nav_col_title">Courses</div>
          <div>Classroom courses</div>
          <div>Virtual classroom courses</div>
          <div>Video Courses</div>
          <div>Offline Courses</div>
        </div> */}
        <div className="footer_nav_col">
          <div className="footer_nav_col_title">Quick Links</div>

          {/* <div>
            <Link href="/">
              <a>Home</a>
            </Link>
          </div> */}
          <div>
            <Link href="/courses">
              <a>Courses</a>
            </Link>
          </div>
          <div>
            <Link href="/privacy-policy">
              <a>Privacy Policy</a>
            </Link>
          </div>
          <div>
            <Link href="/refund-policy">
              <a>Refund Policy</a>
            </Link>
          </div>
          <div>
            <Link href="/terms-cond">
              <a>Terms {"&"} Conditions</a>
            </Link>
          </div>
          <div>
            <Link href="/about">
              <a>About Us</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer2;
