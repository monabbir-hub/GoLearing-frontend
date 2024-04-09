import React, { useEffect, useState } from "react";
import AcademicSelect from "./AcademicSelect";
import CourselistRow from "./CourselistRow";
import { BiSearchAlt } from "react-icons/bi";
import { GetCategoryEnd } from "../../utils/EndPoints";
import Toast from "../../utils/Toast";
import axios from "axios";

const ShowAcademicCourse = ({ filterValue }) => {
  const [selectedClass, setSelectedClass] = useState();
  const [spinner, setSpinner] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    loadAllAcademicCourse();
    // console.log(selectedClass);
  }, [selectedClass]);

  const loadAllAcademicCourse = async () => {
    setSpinner(true);
    let url = GetCategoryEnd;
    // if (id) url += `?category_id=${id}`;
    url += `?name=${selectedClass}`;
    url = url.replace(/ /g, "%20");
    // console.log(url);
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        setId(res?.data?.data[0]?._id);
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      Toast("err", error?.response?.data?.msg || "Try again later!");
      setSpinner(false);
    }
  };

  const classSelection = (i) => {
    if ((i.value === "ssc" || i.value === "hsc") === false)
      setSelectedClass(i.value);
  };

  return (
    <div style={{ minHeight: "300px" }}>
      <AcademicSelect classSelection={classSelection} />
      {selectedClass ? (
        <CourselistRow id={id} />
      ) : (
        <div style={{ textAlign: "center" }}>
          <BiSearchAlt size={150} opacity={0.5} />
          <p>Select class first</p>
        </div>
      )}
    </div>
  );
};

export default ShowAcademicCourse;
