import React from "react";

const DashboardCard = ({ bg, title, subtitle }) => {
  return (
    <div
      style={{
        backgroundImage: `${bg}`,
        borderRadius: "15px",
        padding: "5%",
        marginTop: "10px",
      }}
    >
      <p style={{ color: "white", fontSize: "1vw" }}>{title}</p>
      <p style={{ color: "white", fontSize: "2.5vw" }}>{subtitle}</p>
    </div>
  );
};

export default DashboardCard;
