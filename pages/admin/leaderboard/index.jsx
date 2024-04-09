import React, { useState, useEffect } from "react";
import ADMIN_SIDEBAR from "../../../components/admin/AdminSidebar";
import Navbar from "../../../components/_App/Navbar";
import { format } from "date-fns";
import axios from "axios";
import { toast } from 'react-toastify'

function LeaderBoard(props) {
  const [From, setFrom] = useState();
  const [To, setTo] = useState();
  const [Data, setData] = useState({});
  const [tableData, setTableData] = useState("null");
  const [tableType, setTableType] = useState("sale");

  const setDate = (value, type) => {
    if (type === "from") setFrom(value);
    else setTo(value);
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://api.golearningbd.com/report/sales_report?from=${From}&till=${To}`,
        {
          headers: {
            "x-access-token": localStorage.getItem("go-learning-admin"),
          },
        }
      );
      setData(res.data.data);
      const arr = res?.data?.data?.total_course_sales_datewise[0];

      if (res.status === 200) setTableData(arr);

    } catch (e) {
      toast.error("select date!");
    }
  };
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

          {tableData !== "null" && (
            <>
              <div style={{ marginTop: "2rem" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  {" "}
                  Total Courses Sold : {Data?.number_of_course_sold}
                </div>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  {" "}
                  Total Amount In Taka : {Data?.total_sales_taka} tk
                </div>
              </div>

              <div className="leaderboard_Tabletype" style={{display:"flex",gap: "1rem",margin:"1rem 0" }}>
                <button
                  onClick={() => setTableType("sale")}
                  className="search"
                  style={{
                    cursor: "pointer",
                    height: "35px",
                    width: "120px",
                    borderRadius: "5px",
                    color: tableType!=="sale"?"black":"white",
                    backgroundColor:tableType==="sale"?"#F7B03C":null,
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
                    color: tableType!=="coupon"?"black":"white",
                    backgroundColor:tableType==="coupon"?"#F7B03C":null,
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
                    color: tableType!=="course"?"black":"white",
                    backgroundColor:tableType==="course"?"#F7B03C":null,
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
                            <td>{i._id?.course_id?.alias_name}</td>
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
