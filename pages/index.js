import axios from "axios";
import dynamic from "next/dynamic";
import React from "react";
import Announcement from "../components/Announcement";
import ShowCourseWithFilter from "../components/CustomComponent/ShowCourseWithFilter";
// import AboutArea from "../components/DistanceLearning/AboutArea";
// import CoursesArea from "../components/DistanceLearning/CoursesArea";
import FeedbackSlider from "../components/DistanceLearning/FeedbackSlider";
import InstaFeedArea from "../components/DistanceLearning/InstaFeedArea";
import MainBanner from "../components/DistanceLearning/MainBanner";
// import NewsArticleArea from "../components/DistanceLearning/NewsArticleArea";
// import Footer from "../components/_App/Footer";
import Footer2 from "../components/_App/Footer2";
import Navbar from "../components/_App/Navbar";
import { GetCourseEnd } from "../utils/EndPoints";

const FunFactsThree = dynamic(() =>
  import("../components/Common/FunFactsThree")
);
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API

  const res = await axios.get(GetCourseEnd);

  const data = res.data;

  // Pass data to the page via props
  return { props: { data } };
}

const Index4 = ({ data }) => {
  const courses = data;

  return (
    <div>
      <Navbar />
      <MainBanner />
      <Announcement />
      <ShowCourseWithFilter page="home" />
      <InstaFeedArea refId="ae4be3a77de770d005d4b89c325776d0204da9b8" />
      <FunFactsThree />
      <FeedbackSlider />  
      <Footer2 />
    </div>
  );
};

export default Index4;
