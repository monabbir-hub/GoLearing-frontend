import React, { useEffect,useState } from "react";
import Footer from "../../components/_App/Footer";
import Navbar from "../../components/_App/Navbar";
import withProtected from "../../hooks/withProtected";
import OrderForm from "../../components/CustomComponent/OrderForm";
import CourseOrderSidebar from "../../components/CustomComponent/CourseOrderSidebar";
import { useRouter } from "next/router";
import ManageCouponProvider, {
  useManageCoupon,
} from "../../providers/ManageCouponProvider";
import {
  GetCourseEnd,
} from "../../utils/EndPoints";
import Footer2 from "../../components/_App/Footer2";
import axios from "axios";

const OrderCreate = () => {
  const router = useRouter();
  const course_id = router?.query?.id;
  const [courseData, setCourseData] = useState([]);
  const [offerPrice,setOfferPrice] = useState(0);

  useEffect(() => {
    loadCourseDetails();
  },[])

  const loadCourseDetails = async () => {
    try {
      const res = await axios.get(GetCourseEnd + `?_id=${course_id}`);
      if (res.status === 200) {
        setCourseData(res?.data[0]);
        // loadFullCourse(res?.data[0]?._id)
        console.log(courseData.price);
      } else
        throw new Error(
          res?.data?.msg || "Something went wrong, can't load course"
        );
    } catch (error) {
      alert('err');
    }
  };

  return (
    <div>
      <Navbar />
      <ManageCouponProvider>
        <h2 style={{textAlign:'center'}} className="fw-bold ">Confirm Enrollment</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="container-fluid row" style={{ padding: "5vw 6vw" }}>
            <div className="col-lg-4 col-sm-12" style={{float:'right'}}>
              <CourseOrderSidebar courseId={course_id}  setOfferPrice={setOfferPrice}/>
            </div>
            <div className="col-lg-8 col-sm-12" style={{margin:"0 0 2rem 0"}}>
              <OrderForm price={courseData?.price} offerPrice={offerPrice} course_id={course_id}/>
            </div>
          </div>
        </div>
      </ManageCouponProvider>
      <Footer2 />
    </div>
  );
};

export default withProtected(OrderCreate);
