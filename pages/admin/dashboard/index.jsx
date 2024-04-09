// import { useRouter } from "next/router";
// import { useCallback, useState, useEffect} from "react";
// import { useMutation, useQuery } from "react-query";
// import { toast } from "react-toastify";
// import { API } from "../../../api";
// import AdminLayout from "../../../components/admin/AdminLayout";
// import AddEditCourse from "../../../components/admin/modals/AddEditCourse";
// import Button from "../../../components/admin/shared/Button";
// import Table from "../../../components/admin/shared/Table";
// import DashboardCard from "../../../components/CustomComponent/DashboardCard";
// import { deleteConfirmation } from "../../../lib/sweetAlert";
// import axios from "axios";

// export default function Dashboard() {
//   const router = useRouter();
//   // const [search, setSearch] = useState(null)
//   // const {
//   // 	data: coursesData,
//   // 	status,
//   // 	error,
//   // 	refetch,
//   // } = useQuery(
//   // 	[
//   // 		API.COURSES.GET_COURSES.name,
//   // 		{
//   // 			...(search ? { filter: search } : {}),
//   // 		},
//   // 	],
//   // 	API.COURSES.GET_COURSES
//   // )
//   // const { mutateAsync: duplicateCourse } = useMutation(
//   // 	API.COURSES.DUPLICATE_COURSE
//   // )
//   // const { mutateAsync: deleteCourse } = useMutation(API.COURSES.DELETE_COURSE)

//   // const handleDeleteCourse = useCallback(async (id) => {
//   // 	try {
//   // 		const { isConfirmed } = await deleteConfirmation()
//   // 		if (!isConfirmed) return
//   // 		await deleteCourse(id)
//   // 		await refetch()
//   // 		toast.success('Successfully deleted course')
//   // 	} catch (err) {
//   // 		toast.error(err?.response?.data?.msg || err?.message)
//   // 	}
//   // }, [])

//   const [From, setFrom] = useState("2022-01-01");
//   const [To, setTo] = useState();
//   const [Data, setData] = useState({});

//   const getData = async () => {
//     try {
//       const res = await axios.get(
//         `https://api.golearningbd.com/report/sales_report?from=${From}&till=${To}`,
//         {
//           headers: {
//             "x-access-token": localStorage.getItem("go-learning-admin"),
//           },
//         }
//       );
//       setData(res.data.data);
//     } catch (e) {
//       toast.error("select date!");
//     }
//   };
//   useEffect(() => {
//     const date = new Date();
//     let day = date.getDate();
//     let month = date.getMonth() + 1;
//     let year = date.getFullYear();
//     let currentDate = `${day}-${month}-${year}`;
//     currentDate = currentDate.split("").reverse().join("");
//     setTo(currentDate);
//     getData();
//   }, []);

//   return (
//     <AdminLayout>
//       <div className="" style={{ minHeight: "500px" }}>
//         <h3 style={{ fontWeight: "bolder", marginBottom: "50px" }}>
//           Welcome to GO Learning
//         </h3>
//         <div className="row">
//           <div className="col-lg-3 col-md-6 col-sm-8 col-8">
//             <DashboardCard
//               title="Total Courses Sold"
//               subtitle={Data?.number_of_course_sold}
//               bg="linear-gradient(89.69deg, #F39034 2.03%, #FF2727 99.73% )"
//             />
//           </div>
//           <div className="col-lg-3 col-md-6 col-sm-8 col-8">
//             <DashboardCard
//               title="Total Amount"
//               subtitle={`${Data?.total_sales_taka} tk`}
//               bg="linear-gradient(270deg, #003AD2 0%, #0097EC 100%)"
//             />
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

import React, { useState, useEffect } from "react";
import ADMIN_SIDEBAR from "../../../components/admin/AdminSidebar";
import DashboardCard from "../../../components/CustomComponent/DashboardCard";
import Navbar from "../../../components/_App/Navbar";
import { format } from "date-fns";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

function LeaderBoard(props) {
  const [From, setFrom] = useState("2022-01-01");
  const [To, setTo] = useState();
  const [Data, setData] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [tableData, setTableData] = useState("null");
  const [tableType, setTableType] = useState("sale");
  const [oppFormat, setOppFormat] = useState();

  const setDate = (value, type) => {
    if (type === "from") setFrom(value);
    else setTo(value);
  };

  const getData = async () => {
    try {
      setSpinner(true);
      const res = await axios.get(
        `https://api.golearningbd.com/report/sales_report?from=${From}&till=${To}`,
        {
          headers: {
            "x-access-token": localStorage.getItem("go-learning-admin"),
          },
        }
      );

      if (res.status === 200) {
        setData(res.data.data);
        const arr = res?.data?.data?.total_course_sales_datewise[0];
        setTableData(arr);
        setSpinner(false);
      }

    } catch (e) {
      toast.error("select date!");
      setSpinner(false);
    }
  };

  useEffect(() => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    const oppFormat = `${year}-${month}-${day}`;
    setTo(oppFormat);
    setOppFormat(currentDate);

    if (To) {
      getData();
    }
  }, [To,From,oppFormat]);

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", width: "100vw", padding: "2rem 0" }}>
        <div style={{ width: "15%" }}>
          <ADMIN_SIDEBAR />
        </div>

        <div style={{ flex: "1", padding: "0rem 5rem 0 2rem" }}>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <div style={{ display: "flex", gap: ".5rem" }}>
              <div
                style={{
                  fontSize: "1.3rem",
                  color: "#F7B03C",
                  fontWeight: "bold",
                }}
              >
                From
              </div>
              <input
                type="date"
                value={From}
                onChange={(e) => setDate(e.target.value, "from")}
                style={{ width: "15vw", padding: ".3rem .5rem" }}
              />
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div
                style={{
                  fontSize: "1.3rem",
                  color: "#F7B03C",
                  fontWeight: "bold",
                }}
              >
                Till
              </div>
              <input
                type="date"
                value={To}
                onChange={(e) => setDate(e.target.value, "to")}
                style={{ width: "15vw", padding: ".2rem .5rem" }}
              />
            </div>

            <button
              className="search"
              onClick={() => getData()}
              style={{
                cursor: "pointer",
                height: "35px",
                width: "120px",
                borderRadius: "5px",
              }}
            >
              search
            </button>
          </div>

          {spinner && (
            <div className="my-5 py-5 text-center">
              <Spinner animation="border" />
            </div>
          )}

          {tableData !== "null" && (
            <>
              <div className="row" style={{ margin: "2rem 0 3rem 0" }}>
                <div className="col-lg-3 col-md-6 col-sm-8 col-8">
                  <DashboardCard
                    title="Total Courses Sold"
                    subtitle={Data?.number_of_course_sold}
                    bg="linear-gradient(89.69deg, #F39034 2.03%, #FF2727 99.73% )"
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-8 col-8">
                  <DashboardCard
                    title="Total Amount"
                    subtitle={`${Data?.total_sales_taka} tk`}
                    bg="linear-gradient(270deg, #003AD2 0%, #0097EC 100%)"
                  />
                </div>
              </div>

              <div
                className="leaderboard_Tabletype"
                style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}
              >
                <button
                  onClick={() => setTableType("sale")}
                  className="search"
                  style={{
                    cursor: "pointer",
                    height: "35px",
                    width: "120px",
                    borderRadius: "5px",
                    color: tableType !== "sale" ? "black" : "white",
                    backgroundColor: tableType === "sale" ? "#F7B03C" : null,
                  }}
                >
                  Sales
                </button>
                <button
                  onClick={() => setTableType("coupon")}
                  className="search"
                  style={{
                    cursor: "pointer",
                    height: "35px",
                    width: "120px",
                    borderRadius: "5px",
                    color: tableType !== "coupon" ? "black" : "white",
                    backgroundColor: tableType === "coupon" ? "#F7B03C" : null,
                  }}
                >
                  Coupon
                </button>
                <button
                  onClick={() => setTableType("course")}
                  className="search"
                  style={{
                    cursor: "pointer",
                    height: "35px",
                    width: "120px",
                    borderRadius: "5px",
                    color: tableType !== "course" ? "black" : "white",
                    backgroundColor: tableType === "course" ? "#F7B03C" : null,
                  }}
                >
                  Course
                </button>
              </div>
              <div className="adminTable">
                {tableType === "sale" && (
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Total Sale</th>
                        <th>Total Taka</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData?.sales?.map((i) => {
                        return (
                          <tr>
                            <td>
                              {format(new Date(i._id.date), "dd-MM-yyyy")}
                            </td>
                            <td>{i.total_sales_course}</td>
                            <td>{i.total_sales_taka}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
                {tableType === "coupon" && (
                  <table>
                    <thead>
                      <tr>
                        <th>Coupon</th>
                        <th>Used</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData?.coupon?.map((i) => {
                        return (
                          <tr>
                            <td>{i._id.coupon}</td>
                            <td>{i.total_coupon}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}

                {tableType === "course" && (
                  <table>
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Sale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData?.course?.map((i) => {
                        return (
                          <tr>
                            <td>{i._id?.course_id?.title}</td>
                            <td>{i.total_sold}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
