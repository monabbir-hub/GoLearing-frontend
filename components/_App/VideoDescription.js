import React, { useEffect, useState } from "react";

function VideoDescription({
  courseData,
  viewContentData,
  access,
  AllContents,
  setViewContent,
  setContentSerial,
  contentSerial,
}) {
  const handleLog = (x) => {
    let num = contentSerial;
    if (x == "increment" && num < AllContents.length - 1) num += 1;
    else if (x == "decrement" && num > 0) {
      num -= 1;
    }

    if (!AllContents[num]?.locked) {
      setContentSerial(num);
      setViewContent(AllContents[num]?._id);
    }
  };


  return (
    <>
      <div
        className="video_title"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "1rem",
        }}
      >
        <h5
          className="course_title"
          style={{
            fontWeight: "bold",
            flex: "1",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: "#9F52F3" }}>
            {viewContentData?.title}
            {!access && !viewContentData && "Preview"}
          </span>
        </h5>

        <h5
          className="video_buttons"
          style={{ display: access ? "flex" : "none", gap: ".5rem" }}
        >
          <button onClick={() => handleLog("decrement")}>{"<"} prev</button>
          <button onClick={() => handleLog("increment")}>next {">"}</button>
        </h5>
      </div>
      <div
        className="video_decription"
        style={{
          marginTop: "40px",
          display: viewContentData?.description && access ? "flex" : "none",
          flexDirection: "column",
          width: "65vw",
          overflowX: "hidden",
        }}
      >
        <h5>Description</h5>
        <p
          style={{
            maxHeight: "10rem",
            backgroundColor: "white",
            overflow: "scroll",
            padding: "1rem",
            borderLeft: "3px solid #D2CCE5",
            cursor: "pointer",
          }}
          dangerouslySetInnerHTML={{
            __html: viewContentData?.description,
          }}
        />
      </div>
    </>
  );
}

export default VideoDescription;
