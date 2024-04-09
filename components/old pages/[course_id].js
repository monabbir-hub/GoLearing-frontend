import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import StaticCoursesDetailsSidebar from "../SingleCourses/CoursesDetailsSidebar";
import Footer from "../_App/Footer";
import Navbar from "../_App/Navbar";
import { useCourseDetails } from "../../providers/CourseDetails";
import { FullCourseTreeEnd, GetCourseEnd } from "../../utils/EndPoints";

export default function CourseId() {
  const router = useRouter();

  const [courseData, setCourseData] = useState([]);
  const [fullCourseData, setFullCourseData] = useState({});
  useEffect(() => {
    loadCourseDetails();
  }, [router?.query?.course_id]);

  const loadCourseDetails = async () => {
    try {
      const res = await axios.get(
        GetCourseEnd + `?_id=${router?.query?.course_id}`
      );

      if (res.status === 200) {
        setCourseData(res?.data);
        loadFullCourse(res?.data[0]?._id);
      } else
        throw new Error(
          res?.data?.msg || "Something went wrong, can't load course"
        );
    } catch (error) {
      // Toast('err', error?.response?.data?.msg)
    }
  };

  // let d = JSON.parse(data)
  // d = d.data[0]
  // let fullTree = [],
  //   parsedTree = {}
  // parsedTree = JSON.parse(tree)

  // fullTree = parsedTree?.module

  const courseDetails = useCourseDetails();
  const activeBar = useCourseDetails();

  const handlePreview = (fullCourseData, content) => {
    // href={`/preview_course/${d._id}`}
    courseDetails.setCourseDetails(fullCourseData);
    activeBar.setActiveBar(content);

    router.push(`/course-details/${courseData[0]?._id}`);
  };

  function createMarkup(description) {
    return { __html: description };
  }
  return (
    <React.Fragment>
      <Navbar />
      <div className="courses-details-area pb-100 my-5">
        <h1 className="fw-bold text-center mb-5 px-5">
          {courseData[0]?.title}
        </h1>

        <div className="courses-details-image">
          <img
            src={courseData[0]?.banner || "/images/banner-shape11.png"}
            alt="image"
            style={{ height: "auto", width: "100%" }}
          />
        </div>

        <div className="container">
          <div className="row flex-wrap-reverse">
            <div className="col-lg-8 col-md-12">
              <div className="courses-details-desc">
                <Tabs>
                  <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Curriculum</Tab>
                  </TabList>

                  <TabPanel>
                    <div className="courses-overview">
                      <h3>Course Description</h3>
                      {/* <ReadOnly dataa={courseData[0]?.description} /> */}
                      {/* <CKEditor data={courseData[0]?.description} /> */}
                      <div
                        dangerouslySetInnerHTML={createMarkup(
                          courseData[0]?.description
                        )}
                        style={{
                          whiteSpace: "wrap",
                          overflow: "visible",
                          textOverflow: "ellipsis",
                          wordBreak: "break-all",
                        }}
                      />
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="courses-curriculum">
                      <h3>{courseData[0]?.title}</h3>
                      <ul>
                        {fullCourseData?.module?.length > 0 &&
                          fullCourseData?.module?.map((m, idx) => (
                            <Accordion
                              key={idx}
                              style={{
                                border: "none !important",
                                outline: "none !important",
                                marginBottom: "5px",
                              }}
                            >
                              <Accordion.Item
                                eventKey={idx}
                                style={{
                                  border: "none ",
                                  outline: "none ",
                                  backgroundColor: "#f8f9f8 !important",
                                }}
                              >
                                <Accordion.Header>
                                  <li style={{ width: "95%" }}>
                                    <>
                                      <a className=" d-flex justify-content-between align-items-center flex-wrap">
                                        <span className="courses-name">
                                          {m?.title}
                                        </span>
                                        <div className="courses-meta">
                                          <span className="questions">
                                            {m?.subs?.length} chapters
                                          </span>

                                          <span
                                            className="status"
                                            onClick={() =>
                                              handlePreview(fullCourseData)
                                            }
                                          >
                                            Details
                                          </span>
                                        </div>
                                      </a>
                                    </>
                                  </li>
                                </Accordion.Header>
                                <Accordion.Body
                                  style={{
                                    padding: "0px",
                                    // paddingLeft: '10px',
                                  }}
                                >
                                  <div>
                                    {m?.subs?.length > 0 &&
                                      m?.subs?.map((c, idx) => (
                                        <Accordion
                                          key={idx}
                                          style={{
                                            border: "none",

                                            outline: "none !important",
                                          }}
                                        >
                                          <Accordion.Item
                                            eventKey={idx}
                                            style={{
                                              border: "none ",
                                              borderBottom:
                                                m?.subs?.length - 1 !== idx
                                                  ? "1px solid rgba(0, 0, 0, 0.1)"
                                                  : "none",
                                              outline: "none ",
                                              backgroundColor:
                                                "#f8f9f8 !important",
                                              paddingLeft: "10px ",
                                            }}
                                          >
                                            <Accordion.Header
                                              style={{ border: "none" }}
                                            >
                                              <li style={{ width: "95%" }}>
                                                <>
                                                  <a className=" d-flex justify-content-between align-items-center flex-wrap">
                                                    <span className="courses-name">
                                                      {c?.title}
                                                    </span>
                                                    <div className="courses-meta">
                                                      <span className="questions">
                                                        {c?.contents?.length}{" "}
                                                        contents
                                                      </span>

                                                      <span
                                                        className="status"
                                                        onClick={() =>
                                                          handlePreview(
                                                            fullCourseData
                                                          )
                                                        }
                                                      >
                                                        Details
                                                      </span>
                                                    </div>
                                                  </a>
                                                </>
                                              </li>
                                            </Accordion.Header>
                                            <Accordion.Body
                                              style={{ border: "none" }}
                                            >
                                              <div>
                                                {c?.contents?.length > 0 &&
                                                  c?.contents?.map((c, idx) => (
                                                    <li
                                                      key={idx}
                                                      className="ps-5"
                                                      style={{
                                                        width: "95%",
                                                        cursor:
                                                          c?.public_to_access ===
                                                          false
                                                            ? "not-allowed"
                                                            : "pointer",
                                                      }}
                                                    >
                                                      <a
                                                        className=" d-flex justify-content-between align-items-center"
                                                        disabled={
                                                          c?.public_to_access ===
                                                          false
                                                            ? true
                                                            : false
                                                        }
                                                      >
                                                        <span className=" courses-name">
                                                          {c?.title}
                                                        </span>

                                                        {fullCourseData?.have_full_access ||
                                                        c?.public_to_access ===
                                                          true ? (
                                                          <div className="courses-meta">
                                                            <span
                                                              className="status"
                                                              onClick={() =>
                                                                handlePreview(
                                                                  fullCourseData,
                                                                  c
                                                                )
                                                              }
                                                            >
                                                              Details
                                                            </span>
                                                          </div>
                                                        ) : (
                                                          <div className="courses-meta">
                                                            <span className="status locked">
                                                              <i className="flaticon-password"></i>
                                                            </span>
                                                          </div>
                                                        )}
                                                      </a>
                                                    </li>
                                                  ))}
                                              </div>
                                            </Accordion.Body>
                                          </Accordion.Item>
                                        </Accordion>
                                      ))}
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          ))}
                      </ul>
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>

            <div className="col-lg-4 col-12">
              <StaticCoursesDetailsSidebar
                data={courseData[0]}
                fullCourseData={fullCourseData}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}
