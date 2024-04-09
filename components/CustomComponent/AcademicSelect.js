import React, { useState } from "react";
import Select from "react-select/creatable";

const AcademicSelect = ({ classSelection }) => {
  const [filterValue, setFilterValue] = useState();
  const [subFilterValue, setSubFilterValue] = useState();
  // console.log(filterValue?.value);

  return (
    <div
      className="container-fluid"
      style={{ marginTop: "30px", marginBottom: "30px" }}
    >
      {/* <p style={{ fontWeight: "bold" }}>Class </p> */}
      <div className="row" style={{ marginTop: "0px" }}>
        <div
          className="select-box col-lg-4 col-sm-12"
          style={{ marginBottom: "10px" }}
        >
          <Select
            options={[
              { label: "Class 1", value: "class 1" },
              { label: "Class 2", value: "class 2" },
              { label: "Class 3", value: "class 3" },
              { label: "Class 4", value: "class 4" },
              { label: "Class 5", value: "class 5" },
              { label: "Class 6", value: "class 6" },
              { label: "Class 7", value: "class 7" },
              { label: "Class 8", value: "class 8" },
              { label: "Class 9-10", value: "ssc" },
              { label: "Class 11-12", value: "hsc" },
            ]}
            onChange={(value) => {
              setFilterValue(value);
              setSubFilterValue();
              classSelection(value);
            }}
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
        </div>

        {filterValue?.value === "ssc" && (
          <div className="select-box col-lg-4 col-sm-12">
            <Select
              options={[
                { label: "Science (SSC)", value: "Science-ssc" },

                { label: "Humanities (SSC)", value: "Humanities-ssc" },

                {
                  label: "Business Studies (SSC)",
                  value: "Business-ssc",
                },
              ]}
              onChange={(value) => {
                setSubFilterValue(value);
                classSelection(value);
              }}
              styles={{
                // Fixes the overlapping problem of the component
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
            />
          </div>
        )}
        {filterValue?.value === "hsc" && (
          <div className="select-box col-lg-4 col-sm-12">
            <Select
              options={[
                { label: "Science (HSC)", value: "Science-hsc" },

                { label: "Humanities (HSC)", value: "Humanities-hsc" },

                {
                  label: "Business Studies (HSC)",
                  value: "Business-hsc",
                },
              ]}
              onChange={(value) => {
                setSubFilterValue(value);
                classSelection(value);
              }}
              styles={{
                // Fixes the overlapping problem of the component
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicSelect;
