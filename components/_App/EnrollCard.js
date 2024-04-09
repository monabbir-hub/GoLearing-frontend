import React from "react";
import EnrollData from "./EnrollData";
import Link from "next/link";

function EnrollCard({original_price, price,
  instructor_name,
  duration,
  certificate,
  language,
  access,
  quizzes,
  lessons,
  id,
}) {
  return (
    <div
      className="enroll_card"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "auto",
        width: "350px",
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.1)",
        marginBottom: "40px",
      }}
    >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold", marginRight: "20px" }}>Price</p>
            <p style={{  Weight: "bold", textAlign: "right" }}>
                <span style={{ color:'gray', Weight: "bold",textDecoration: "line-through" }}>৳{original_price}</span>
                  <b style={{ color:'#B8252A'}}>{"  "}৳{price}{" "}</b>
            </p>
        </div>
        {/*<EnrollData fieldName="Instructor" value={instructor_name} />*/}
      <EnrollData fieldName="Duration" value={duration} />
      {certificate && <EnrollData fieldName="Certificate" value="On Completion" />}
      <EnrollData fieldName="Language" value={language} />
      <EnrollData fieldName="Quizzes" value={quizzes} />
      <EnrollData fieldName="Lessons" value={lessons} />
      <Link href={`/order/${id}`}>
        <button
          className="enroll_btn"
          style={{
            border: "none",
            backgroundColor: "rgb(246,176,60)",
            width: "100%",
            color: "white",
            height: "50px",
            fontWeight: "bold",
            borderRadius: "5px",
          }}
        >
          Join Now
        </button>
      </Link>
    </div>
  );
}

export default EnrollCard;
