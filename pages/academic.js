import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer2 from "../components/_App/Footer2";
import Navbar from "../components/_App/Navbar";
import Select from "react-select/creatable";

import {
  GetAllTagsEnd,
  GetCategoryEnd,
  GetCourseEnd,
} from "../utils/EndPoints";
import Toast from "../utils/Toast";
import AcademicSelect from "../components/CustomComponent/AcademicSelect";
import CourselistRow from "../components/CustomComponent/CourselistRow";
import ShowAcademicCourse from "../components/CustomComponent/ShowAcademicCourse";

const academic = () => {
  const [rootCat, setRootCat] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [filterValue, setFilterValue] = useState();
  const [selectedClass, setSelectedClass] = useState();
  useEffect(() => {
    loadRootCategory();

    // loadOtherCourses();
  }, []);

  const loadRootCategory = async () => {
    setSpinner(true);
    let url = GetCategoryEnd + "?_id=62d323cbee11570016070d58";
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        setRootCat(res?.data?.data[0]);
        // setFilter(res?.data?.data);
        setSpinner(false);
      } else throw new Error(res?.data?.msg);
    } catch (error) {

      Toast("err", error?.response?.data?.msg || "Try again later!");
      setSpinner(false);
    }
  };

  // const classSelection = (i) => {
  //   if ((i.value === "ssc" || i.value === "hsc") === false)
  //     setSelectedClass(i.value);
  // };

  return (
    <div>
      <Navbar />
      <div>
        <img src={rootCat.banner} alt="courses5" />
      </div>

      <ShowAcademicCourse />

      <Footer2 />
    </div>
  );
};

export default academic;
