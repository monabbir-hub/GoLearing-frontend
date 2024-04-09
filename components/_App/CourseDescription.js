import React from "react";
import EnrollCard from "../../components/_App/EnrollCard";
import InstructorList from "../../components/_App/InstructorList";

function CourseDescription({ courseData }) {
  return (
    <div
      className="course_details"
      style={{
        padding: "20px",
        display: "flex",
        margin: "50px 20px 0 20px",
      }}
    >
      <div
        className="course_description"
        style={{ display: courseData.description ? "flex" : "none" }}
      >
        <h3 style={{ marginBottom: "1vw" }}>Course Description</h3>
        <div dangerouslySetInnerHTML={{ __html: courseData.description }} />
      </div>
      <div style={{ height: "100%" }}>
        <EnrollCard
            original_price={courseData.original_price}
          price={courseData.price}
          instructor_name={courseData.instructor_name}
          duration={courseData.duration}
          certificate={courseData.certificate}
          language={courseData.language}
          access={courseData.access}
          quizzes={courseData.total_quiz}
          lessons={courseData.total_lecture}
          id={courseData._id}
        />

        {/*<InstructorList />*/}
      </div>
    </div>
  );
}

export default CourseDescription;
