import React from "react";
import Chapter from "./Chapter";
import Link from "next/link";

function Playlist({
  fullCourseTree,
  access,
  setViewContent,
  setAllContents,
  AllContents,
  viewContent,
  certificate,
  contentStatus,
  setContentSerial,
  allowCertificate
}) {
  return (
    <div
      className="course_playlists"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px 20px 0 20px",
        flex: "1",
      }}
    >
      <h3>Course Playlists</h3>
      <div
        className="playlist"
        style={{ height: "35vw", overflowY: "scroll", flex: "1" }}
      >
        {fullCourseTree?.map((module, chapter_key) => {
          return module?.subs?.map((chapter, key) => {
            return (
              <Chapter
                title={chapter.title}
                contents={chapter.contents}
                setViewContent={setViewContent}
                AllContents={AllContents}
                viewContent={viewContent}
                access={access}
                contentStatus={contentStatus}
                setContentSerial={setContentSerial}
                key={key + chapter_key}
              />
            );
          });
        })}
      </div>
      {access && allowCertificate && (
        <Link href={`/certificate/${fullCourseTree[0]?.course_id}`}>
          <button
            className="certificate_btn"
            style={{
              width: "100%",
              padding: "1rem 0",
              backgroundColor: "#3CCF4E",
              outline: "none",
              cursor: "pointer",
              border: "none",
              color: "white",
              borderRadius: "5px",
              fontWeight: "bold",
              boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.1)",
              pointerEvents:certificate?'all':'none',
            }}
            disabled={certificate ? false : true}
          >
            Get Certificate
          </button>
        </Link>
      )}
    </div>
  );
}

export default Playlist;
