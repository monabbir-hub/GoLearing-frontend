import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/_App/Navbar";
import Footer2 from "../../components/_App/Footer2";
import Playlist from "../../components/_App/Playlist";
import { FullCourseTreeEnd, GetCourseEnd } from "../../utils/EndPoints";
import ContentDisplayer from "../../components/_App/ContentDisplayer";
import VideoDescription from "../../components/_App/VideoDescription";
import CourseDescription from "../../components/_App/CourseDescription";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import "swiper/css";

function coursePage() {
  const router = useRouter();
  const course_id = router?.query?.course_id;

  const [courseData, setCourseData] = useState({});
  const [fullCourseTree, setFullCourseTree] = useState([]);
  const [viewContentData, setViewContentData] = useState([]);
  const [access, setAccess] = useState(false);
  const [AllContents, setAllContents] = useState([]);
  const [viewContent, setViewContent] = useState();
  const [certificate, setCertificate] = useState(false);
  const [contentStatus, setContentStatus] = useState();
  const [contentSerial, setContentSerial] = useState(0);
  const [allowCertificate, setAllowCertificate]=useState();

  useEffect(() => {
    loadCourseDetails();
    loadFullCourseTree();
  }, [course_id, access]);

  useEffect(() => {
    const data = AllContents.filter((content) => content._id == viewContent)[0];
    setViewContentData(data);
    if (access) updateContentLog();
  }, [viewContent]);

  const loadCourseDetails = async () => {
    try {
      const res = await axios.get(GetCourseEnd + `?_id=${course_id}`);
      if (res.status === 200) {
        setCourseData(res?.data[0]);
        setAllowCertificate(res?.data[0].certificate);
      }
      throw new Error(
        res?.data?.msg || "Something went wrong, c1n't load course"
      );
    } catch (error) {
      // Toast('err', error?.response?.data?.msg)
    }
  };

  const loadFullCourseTree = async () => {
    try {
      const res = await axios.get(
        FullCourseTreeEnd + `?course_id=${course_id}`,
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );
      if (res.status === 200) {
        const data = res?.data?.module;
        setFullCourseTree(data);
        setAccess(res?.data?.have_full_access);
        setCertificate(res?.data?.course_status?.certificate);
        setContentStatus(res?.data?.course_status?.status);

        for (let i = 0; i < data.length; i++) {
          let contents = [];
          const chapter = data[i].subs;
          for (let j = 0; j < chapter.length; j++) {
            contents = [...contents, ...chapter[j].contents];
            setAllContents(contents);
            {
              access && setViewContent(contents[0]._id);
            }
            if (viewContent) updateContentLog();
          }
        }
      }
      throw new Error(
        res?.data?.msg || "Something went wrong, can't load course tree"
      );
    } catch (error) {
      // Toast('err', error?.response?.data?.msg)
    }
  };

  const updateContentLog = async () => {
    try {
      const res = await axios.put(
        "https://api.golearningbd.com/course_log/update_status",
        {
          course_id: course_id,
          content_id: viewContent,
          content_type: viewContentData.content_type,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );

      throw new Error(
        res?.data?.msg || "Something went wrong, can't load course"
      );
    } catch (error) {
      // Toast('err', error?.response?.data?.msg)
    }
  };

  return (
    <div className="course_page">
      <Navbar />
      <div className="course" style={{ padding: "0 20px 20px 20px" }}>
        <div
          className="course_view"
          style={{
            width: "100%",
            display: "flex",
            backgroundColor: "#EFEBF5",
            padding: "30px 30px 50px 30px",
          }}
        >
          <div>
            <div
              className="page_route"
              style={{ fontSize: "15px", margin: "10px 0", fontWeight: "bold" }}
            >
              Course | <span style={{ color: "#9C4DF4" }}>{courseData?.title}</span>
            </div>

            <ContentDisplayer
              viewContentData={viewContentData}
              courseData={courseData}
              access={access}
            />

            <VideoDescription
              viewContentData={viewContentData}
              courseData={courseData}
              access={access}
              AllContents={AllContents}
              setViewContent={setViewContent}
              contentSerial={contentSerial}
              setContentSerial={setContentSerial}
            />
          </div>
          <Playlist
            fullCourseTree={fullCourseTree}
            access={access}
            setViewContent={setViewContent}
            setAllContents={setAllContents}
            AllContents={AllContents}
            viewContent={viewContent}
            certificate={certificate}
            contentStatus={contentStatus}
            setContentSerial={setContentSerial}
            allowCertificate={allowCertificate}
          />
        </div>
        {!access && <CourseDescription courseData={courseData} />}
      </div>

      <Footer2 />
    </div>
  );
}

export default coursePage;
