import React from "react";
import Image from 'next/image';

function Instructor({ name, src, dept, varsity }) {
  return (
    <div
      className="instructor"
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: "10px",
        height: "80px",
        width: "320px",
        cursor: "pointer",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          height: "55px",
          width: "55px",
          backgroundColor: "black",
          borderRadius: "50%",
          marginRight: "10px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Image src={src} layout="fill" />
      </div>
      <div style={{ textTransform: "capitalize", flex: "1" }}>
        <h6>{name}</h6>
        <div style={{ color: "gray" }}>{dept} , {varsity}</div>
      </div>
    </div>
  );
}

export default Instructor;
