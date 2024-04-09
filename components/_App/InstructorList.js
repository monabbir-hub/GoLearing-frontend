import React from "react";
import Instructor from "./Instructor";

function InstructorList(props) {
  return (
    <div
      className="instructor_container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h3 style={{ marginBottom: "2vw" }}>Instructors</h3>
      <div
        style={{
          boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <Instructor
          name="Sakib Chowdhury"
          dept="CSE"
          varsity="Dhaka University"
          src="/images/user3.jpg"
        />
        <Instructor
          name="Sakib Chowdhury"
          dept="CSE"
          varsity="Dhaka University"
          src="/images/user3.jpg"
        />
        <Instructor
          name="Sakib Chowdhury"
          dept="CSE"
          varsity="Dhaka University"
          src="/images/user3.jpg"
        />
        <Instructor
          name="Sakib Chowdhury"
          dept="CSE"
          varsity="Dhaka University"
          src="/images/user3.jpg"
        />
        <Instructor
          name="Sakib Chowdhury"
          dept="CSE"
          varsity="Dhaka University"
          src="/images/user3.jpg"
        />
      </div>
    </div>
  );
}

export default InstructorList;
