import { fi } from "date-fns/locale";
import React from "react";

function EnrollData({ fieldName, value, color }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p style={{ fontWeight: "bold", marginRight: "20px" }}>{fieldName}</p>
      <p style={{ color: color, Weight: "bold", textAlign: "right" }}>
        {fieldName === "Price" ? "৳" : null}
        {value}{" "}
      </p>
    </div>
  );
}

export default EnrollData;
