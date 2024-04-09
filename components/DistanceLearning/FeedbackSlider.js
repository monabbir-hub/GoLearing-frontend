import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { API } from "../../api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper";
import Testimonial from "../_App/Testimonial.js";
import axios from "axios";

const FeedbackSlider = () => {
  const [testimonials, setTestimonials] = useState();
  const { data: miscData } = useQuery(
    [API.MISC.GET_STATIC.name],
    API.MISC.GET_STATIC
  );

  useEffect(() => {
    LoadTestimonials();
  },[miscData?.data?.testimonial?.length]);

  const LoadTestimonials = async () => {
    try {
      const res = await axios.get("https://api.golearningbd.com/static/get");
      if (res.status === 200) {
        setTestimonials(res?.data?.testimonial);
   
      } else
        throw new Error(
          res?.data?.msg || "Something went wrong, cannot load course"
        );
    } catch (error) {
      // Toast('err', error?.response?.data?.msg)
    }
  };

  if (!miscData?.data?.testimonial?.length) return null;
  return (
    <div
      className="feedback"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F7F5FA",
        padding: "4rem 0 3rem 0",
      }}
    >
      <h1 style={{ marginBottom: "0vw" }}>Testimonial</h1>

      {testimonials ? (
        <Swiper
          slidesPerView="auto"
          spaceBetween={20}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="testimonial_carousel"
        >
          {testimonials.map((d) => {
            return (
              <SwiperSlide>
                <Testimonial data={d} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        "nothing to show"
      )}
    </div>
  );
};

export default FeedbackSlider;
