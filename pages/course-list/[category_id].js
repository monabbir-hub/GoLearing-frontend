
import React from "react";
import {useRouter} from "next/router";
import Navbar from "../../components/_App/Navbar";
import Footer2 from "../../components/_App/Footer2";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ShowCourseList from "./ShowCourseList";

const ShowCourses = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <div>
        <Navbar />
        <ShowCourseList routerId={router?.query?.category_id} />
        {/* <Footer /> */}
        <Footer2 />
      </div>
    </React.Fragment>
  );
};

export default ShowCourses;
