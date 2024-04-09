import React, { useEffect, useState } from "react";
import Quiz from "../../components/Layouts/Quiz";
import { Document, Page, pdfjs } from "react-pdf";
import { useCourseDetails } from "../../providers/CourseDetails";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

function ContentDisplayer({ viewContentData, access, courseData }) {
  const [zoomValue, setZoomValue] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const bar = useCourseDetails();

  const isValidUrl = urlString => {
    try { 
      return Boolean(new URL(urlString)); 
    }
    catch(e){ 
      return false; 
    }
}
  useEffect(() => {
    bar.setActiveBar(viewContentData);
  }, [viewContentData]);

  return (
    <div
      className="content_displayer"
      style={{
        width: "65vw",
        maxHeight: "35vw",
        minHeight: "30vw",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          maxHeight: "35vw",
          minHeight: "30vw",
          backgroundColor: viewContentData?.content_type == "quiz"
          ? "white"
          : "black",
          overflow: "scroll",
          borderRadius: "10px",
          cursor: "pointer",
          display:
            viewContentData?.content_type == "resource"
              ? "inline-block"
              : "flex",
        }}
      >
        {!access && !viewContentData && (
          <div
            className="content_video"
            style={{
              display: "flex",
              margin: "0 auto",
              width: "100%",
              height: "auto !important",
            }}
          >
            {isValidUrl(courseData?.preview) && (
              <iframe
                style={{ width: "65vw", height: "35vw" }}
                className="preview"
                src={courseData?.preview}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        )}
        {(access || viewContentData?.public_to_access) && (
          <>
            <div
              className="content_video"
              style={{
                display:
                  viewContentData?.content_type == "lecture" ? "flex" : "none",
                margin: "0 auto",
                width: "100%",
                height: "auto !important",
              }}
            >
              {isValidUrl(viewContentData?.link) && (
                <iframe
                  style={{ width: "65vw", height: "35vw" }}
                  className="preview"
                  src={viewContentData?.link}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div
              style={{
                display:
                  viewContentData?.content_type == "resource" ? "flex" : "none",
                justifyContent: "center",
              }}
            >
              {viewContentData?.content_type == "resource" && (
                <iframe
                  src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${viewContentData?.link[0]?.link}#toolbar=0&scrollbar=0`}
                  frameBorder="0"
                  height="500px"
                  width="100%"
                ></iframe>
              )}
            </div>
            <div
              className="content_video"
              style={{
                display:
                  viewContentData?.content_type === "quiz" ||
                  bar?.activeBar?.content_type === "quiz_attempt"
                    ? "flex"
                    : "none",
                margin: "0 auto",
                width: "100%",
                height: "auto !important",
                padding: "2vw 3vw",
              }}
            >
              <Quiz />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ContentDisplayer;
