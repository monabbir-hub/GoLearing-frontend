import React, { useState, useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckIcon from "@mui/icons-material/Check";

function Chapter({
  title,
  contents,
  setViewContent,
  access,
  viewContent,
  contentStatus,
  AllContents,
  setContentSerial
}) {
  const [displayContent, setDisplayContent] = useState("none");
  const [rotateIcon, setRotateIcon] = useState("rotate(180deg)");

  useEffect(()=>{
    console.log(AllContents);
  },[AllContents])


  const handleContentDropdown = () => {
    if (displayContent == "none") {
      setRotateIcon("rotate(360deg)");
      setDisplayContent("block");
    } else {
      setRotateIcon("rotate(180deg)");
      setDisplayContent("none");
    }
  };

  const handleContent = (content) => {
    if (access || content?.public_to_access) {
      setViewContent(content._id);
    }

    const serial = AllContents.indexOf(content);
    setContentSerial(serial);
  };

  return (
    <div
      className="chapter_container"
      style={{
        display: contents.length !== 0 ? "flex" : "none",
        flexDirection: "column",
        borderRadius: ".3vw",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px 0",
        boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        backgroundColor: "#9F52F3",
        cursor: "pointer",
      }}
    >
      <div
        className="chapter"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "1.25vw 1vw",
          cursor: "pointer",
        }}
        onClick={handleContentDropdown}
      >
        <div style={{ fontWeight: "bold", color: "white" }}>{title}</div>
        <KeyboardArrowUpIcon
          style={{ cursor: "pointer", transform: rotateIcon, color: "white" }}
        />
      </div>
      <div
        style={{
          display: displayContent,
          width: "100%",
        }}
      >
        {contents &&
          contents.map((content, key) => {
            return (
              <div key={key}>
                <div
                  className="chapter_content"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: ".75vw 1vw",
                    backgroundColor:
                      viewContent == content._id &&
                      (access || content.public_to_access)
                        ? "rgba(255,255,255,.8)"
                        : "rgb(247, 247, 247)",
                    color: "rgba(0,0,0,.7)",
                    borderTop: "1px solid rgba(0,0,0,.1)",
                  }}
                  onClick={() => !content.locked && handleContent(content)}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ArticleOutlinedIcon
                      style={{
                        display:
                          content.content_type == "resource"
                            ? "inline-block"
                            : "none",
                        color: "#9F52F3",
                      }}
                    />
                    <PlayCircleFilledWhiteOutlinedIcon
                      style={{
                        display:
                          content.content_type == "lecture"
                            ? "inline-block"
                            : "none",
                        color: "#9F52F3",
                      }}
                    />
                    <CreateOutlinedIcon
                      style={{
                        display:
                          content.content_type == "quiz" ||
                          content.content_type == "quiz_attempt"
                            ? "inline-block"
                            : "none",
                        color: "#9F52F3",
                      }}
                    />
                    <div style={{ margin: "0 10px" }}>{content.title}</div>
                  </div>
                  <LockOutlinedIcon
                    style={{
                      color: "#9F52F3",
                      display:
                        (access == false && content?.public_to_access == false)||content?.locked
                          ? "flex"
                          : "none",
                    }}
                  />
                  <CheckIcon
                    style={{
                      color: "#3CCF4E",
                      display:
                        access == true && content?.locked == false && contentStatus?.[content._id]
                          ? "flex"
                          : "none",
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Chapter;
