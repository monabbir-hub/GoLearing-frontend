import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import EditOrder from "../../components/Order/EditOrder";
import Footer from "../../components/_App/Footer";
import Navbar from "../../components/_App/Navbar";
import { GetMyCourseEnd, OrderGetEnd } from "../../utils/EndPoints";
import Toast from "../../utils/Toast";
import tabclasses from "../../styles/Tab.module.css";
import CourseCard from "../../components/CustomComponent/CourseCard";
import CourseCardSub from "../../components/CustomComponent/CourseCardSub";
import CertificateCard from "../../components/CustomComponent/CertificateCard";
import ProfileCard from "../../components/CustomComponent/ProfileCard";
import { FiCompass } from "react-icons/fi";
import { FaCertificate } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import { format } from "date-fns";
import Footer2 from "../../components/_App/Footer2";

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [enrolledSpinner, setEnrolledSpinner] = useState(false);
  const [selTab, setSelTab] = useState("My Courses");
  const [certificateData, setCertificateData] = useState();

  useEffect(() => {
    loadMyCourses();
    loadAllEnrolledCourses();
    // console.log(enrolledCourses);
  }, []);

  useEffect(() => {
    loadCertificate();
  }, []);

  const loadCertificate = async () => {
    try {
      const res = await axios.get(
        `https://api.golearningbd.com/certificate/get`,
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );
      if (res.status === 200) {
        const data = res?.data?.data;
        console.log("data", data);
        setCertificateData(data);
      }
      throw new Error(
        res?.data?.msg || "Something went wrong, can't load course tree"
      );
    } catch (error) {
      // Toast('err', error?.response?.data?.msg)
    }
  };

  const loadMyCourses = async () => {
    setSpinner(true);
    try {
      const res = await axios.get(GetMyCourseEnd, {
        headers: {
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      });
      if (res.status === 200) {
        setMyCourses(res?.data?.data?.enrolled_courses);
        setSpinner(false);
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      Toast("err", error.response?.data?.msg);
      setSpinner(false);
    }
  };

  const loadAllEnrolledCourses = async () => {
    setEnrolledSpinner(true);
    try {
      const res = await axios.get(OrderGetEnd, {
        headers: {
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      });
      if (res.status === 200) {
        setEnrolledCourses(res?.data?.data?.data);
        setEnrolledSpinner(false);
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      Toast("err", error.response?.data?.msg);
      setEnrolledSpinner(false);
    }
  };
  const [details, setDetails] = useState({});
  const [editOrderModal, setEditOrderModal] = useState(false);
  const [editData, setEditData] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setDetails({});
  };

  useEffect(() => {
    details?._id && setShow(true);
  }, [details]);

  const editOrder = (d) => {
    setEditOrderModal(true);
    setEditData(d);
  };

  return (
    <React.Fragment>
      <Navbar />
      <div
        style={{
          backgroundColor: "rgba(243, 243, 243, 0.808)",
          minHeight: "800px",
        }}
      >
        <div className={`pb-70 container-fluid ${tabclasses.reactTabs}`}>
          <Tabs>
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <TabList
                  style={{
                    padding: "20px",
                    listStyle: "none",
                    borderBottom: "0px",
                  }}
                >
                  <div
                    className={tabclasses.tablist}
                    style={{
                      borderRadius: "20px",
                      backgroundColor: "white",
                      padding: "20px",
                    }}
                  >
                    <Tab className="col-12" style={{ marginBottom: "15px" }}>
                      <p
                        onClick={() => setSelTab("My Courses")}
                        className={
                          selTab === "My Courses"
                            ? `${tabclasses.tab_selected}`
                            : ""
                        }
                      >
                        <span style={{ marginRight: "5px" }}>
                          <FiCompass />
                        </span>
                        My Courses
                      </p>
                    </Tab>
                    <Tab className="col-12" style={{ marginBottom: "15px" }}>
                      <p
                        onClick={() => setSelTab("Certificates")}
                        className={
                          selTab === "Certificates"
                            ? `${tabclasses.tab_selected}`
                            : ""
                        }
                      >
                        <span style={{ marginRight: "5px" }}>
                          <FaCertificate />
                        </span>
                        Certificates
                      </p>
                    </Tab>
                    <Tab className="col-12" style={{ marginBottom: "15px" }}>
                      <p
                        onClick={() => setSelTab("Purchase History")}
                        className={
                          selTab === "Purchase History"
                            ? `${tabclasses.tab_selected}`
                            : ""
                        }
                      >
                        <span style={{ marginRight: "5px" }}>
                          <FaHistory />
                        </span>{" "}
                        Purchase History
                      </p>
                    </Tab>
                    <Tab className="col-12" style={{ marginBottom: "15px" }}>
                      <p
                        onClick={() => setSelTab("My Account")}
                        className={
                          selTab === "My Account"
                            ? `${tabclasses.tab_selected}`
                            : ""
                        }
                      >
                        <span style={{ marginRight: "5px" }}>
                          {" "}
                          <AiOutlineCalendar />{" "}
                        </span>
                        My Account
                      </p>
                    </Tab>
                  </div>
                </TabList>
              </div>
              <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <TabPanel style={{ marginTop: "20px", marginLeft: "20px" }}>
                  {" "}
                  {spinner && (
                    <div className="text-center">
                      <Spinner animation="border" />
                    </div>
                  )}
                  {!spinner && (
                    <div className="row" style={{ paddingRight: "3%" }}>
                      {myCourses.length > 0 ? (
                        myCourses.map((enrolled) => (
                          <div
                            className="col-lg-4 col-sm-12"
                            style={{ maxWidth: "21rem" }}
                            key={enrolled?._id}
                          >
                            <CourseCardSub
                              id={enrolled?._id}
                              banner={enrolled?.thumbnail}
                              title={enrolled?.title}
                              description={enrolled?.description}
                              author=""
                              completion="0"
                            />
                          </div>
                        ))
                      ) : (
                        <div className="col-lg-12">
                          <h2 className="empty-content">Empty</h2>
                          {/* <CourseCardSub /> */}
                        </div>
                      )}
                    </div>
                  )}
                </TabPanel>
                <TabPanel style={{ marginTop: "20px" }}>
                  {spinner && (
                    <div className="text-center">
                      <Spinner animation="border" />
                    </div>
                  )}
                  {!spinner && (
                    <div className="col-lg-12">
                      {certificateData?.length == 0 ? (
                        <h2 className="empty-content">
                          You have not completed any course yet
                        </h2>
                      ) : null}
                    </div>
                  )}
                  <Table
                    striped
                    bordered
                    hover
                    responsive={true}
                    className="text-center"
                  >
                    <thead>
                      <tr>
                        <th>Course Name</th>
                        <th>Completed On</th>
                        <th>Certificate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certificateData?.map((d, idx) => (
                        <tr key={idx}>
                          <td
                            onClick={() => setDetails(d)}
                            style={{ cursor: "pointer" }}
                          >
                            {d?.course_id?.title}
                          </td>
                          <td
                            onClick={() => setDetails(d)}
                            style={{ cursor: "pointer" }}
                          >
                            {format(
                              new Date(d?.student_id?.createdAt),
                              "dd-MM-yyyy"
                            )}
                          </td>
                          <td>
                            <Link href={`/certificate/${d?.course_id?._id}`}>
                              <Button
                                variant="success"
                                className="fw-bold text-white"
                              >
                                {" "}
                                Collect{" "}
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </TabPanel>
                <TabPanel className="" style={{ marginTop: "20px" }}>
                  <Table
                    striped
                    bordered
                    hover
                    responsive={true}
                    className="text-center"
                  >
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Course Name</th>
                        {/* <th>Transaction Id</th> */}
                        <th>Date</th>
                        <th>Transaction ID</th>
                        <th>Price</th>
                        <th>Edit</th>
                        <th>Order Status</th>
                        {/* <th>Status</th> */}
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {enrolledCourses?.map((d, idx) => (
                        <tr key={idx}>
                          <td
                            onClick={() => setDetails(d)}
                            style={{ cursor: "pointer" }}
                          >
                            {idx + 1}
                          </td>
                          <td
                            onClick={() => setDetails(d)}
                            style={{ cursor: "pointer" }}
                          >
                            {d?.details?.course?.title}
                          </td>
                          <td
                            onClick={() => setDetails(d)}
                            style={{ cursor: "pointer" }}
                          >
                            {format(new Date(d?.createdAt), "dd-MM-yyyy")}
                          </td>

                          <td
                            onClick={() => setDetails(d)}
                            style={{ cursor: "pointer" }}
                          >
                            {d?.bkash_transaction_id || "_"}
                            {/* {d?.status} */}
                          </td>
                          <td
                            onClick={() => setDetails(d)}
                            style={{ cursor: "pointer" }}
                          >
                            {d?.details?.course?.price || "_"}
                            {/* {d?.status} */}
                          </td>
                          <td>
                            {
                              <Button
                                variant="danger"
                                className="fw-bold"
                                onClick={() => editOrder(d)}
                              >
                                {" "}
                                Edit{" "}
                              </Button>
                            }
                          </td>
                          <td
                            onClick={() => setDetails(d)}
                            style={{ cursor: "pointer" }}
                          >
                            {d?.status || "_"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </TabPanel>
                <TabPanel style={{ marginTop: "20px" }}>
                  <ProfileCard />
                </TabPanel>
              </div>
            </div>
          </Tabs>
          <EditOrder
            show={editOrderModal}
            handleClose={() => setEditOrderModal(false)}
            data={editData}
            loadAllEnrolledCourses={loadAllEnrolledCourses}
          />

          <Modal
            centered
            show={show}
            onHide={handleClose}
            style={{ border: "none" }}
            size="lg"
          >
            <Modal.Body style={{ border: "none" }}>
              <h3 className="fw-bold mb-4">Order Details</h3>
              <h4>
                <strong>Course Name: </strong> {details?.details?.course?.title}
              </h4>
              <h4>
                <strong>Course Id: </strong> {details?.details?.course_id}
              </h4>
              <h4>
                <strong>Order Id: </strong> {details?._id}
              </h4>
              <h4>
                <strong>Order Status: </strong> {details?.status}
              </h4>
              <h4>
                <strong>Transaction Id: </strong>{" "}
                {details?.bkash_transaction_id}
              </h4>
              <h4>
                <strong>Payment Provider: </strong> {details?.payment_provider}
              </h4>
              <h4>
                <strong>Short Id: </strong> {details?.short_id}
              </h4>
              <h4>
                <strong>Total Amount: </strong> {details?.total_amount}
              </h4>
              <h4>
                <strong>Created At: </strong> {details?.createdAt?.slice(0, 10)}
              </h4>
              <h4>
                <strong>Updated At: </strong> {details?.updatedAt?.slice(0, 10)}
              </h4>
            </Modal.Body>
            <Modal.Footer style={{ border: "none" }}>
              <Button
                variant="danger"
                className="fw-bold"
                onClick={handleClose}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Footer2 />
    </React.Fragment>
  );
};

export default MyCourses;
