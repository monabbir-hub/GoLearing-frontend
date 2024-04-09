import React,{useEffect,useState} from "react";
import Image from "next/image";

function Testimonial({data}) {

  return (
    <div
      className="testimonial"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <div
        style={{
          position: "absolute",
          top: "-8%",
          left: "53%",
          transform: "translateX(-50%)",
          zIndex: "1000",
        }}
      >
        <div
          className="testimonial_writer"
          style={{
            position: "relative",
            width: "4vw",
            height: "4vw",
            borderRadius: "1000px",
            overflow: "hidden",
            backgroundColor: "black",
          }}
        >
          <Image src={data?.photo} layout="fill" objectFit="cover" />
        </div>
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            height: "100%",
            width: "100%",
            zIndex: "-10",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src='/images/testimonial.png'
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div
          className="testimonial_content"
          style={{
            width: "100%",
            height: "85%",
            display: "flex",
            flexDirection: "column",
            padding: "3.35vw",
            zIndex: "1000",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <p
            className="testimonial_name"
            style={{
              marginBottom: ".3rem",
              color: "black",
              fontSize: "1.3vw",
              fontWeight: "normal !important",
            }}
          >
            {data?.name}
          </p>
          <div
            className="testimonial_varsity"
            style={{ fontSize: ".8vw", color: "gray" }}
          >
            {data?.designation}
          </div>
          <p
            className="testimonial_feedback"
            style={{
              fontSize: ".9vw",
              marginTop: "1rem",
            }}
          >
            {data?.text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
