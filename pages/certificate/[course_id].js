import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const [data, setData] = useState();
  const router = useRouter();
  const course_id = router?.query?.course_id;
  useEffect(() => {
    loadCertificate();
  }, [course_id]);

  const loadCertificate = async () => {
    try {
      const res = await axios.get(
        `https://api.golearningbd.com/certificate/get?course_id=${course_id}`,
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );
      if (res.status === 200) {
        const data = res?.data?.data[0];
        setData(data);
      }
      throw new Error(
        res?.data?.msg || "Something went wrong, can't load course tree"
      );
    } catch (error) {
      // Toast('err', error?.response?.data?.msg)
    }
  };
  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        margin: "auto auto",
        padding: "2rem 0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="certificate_container"
          style={{
            border: "5px solid #DC8519",
            padding: "2rem 5rem",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            maxWidth: "720px",
            textAlign: "center",
            gap: ".5rem",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <Image src="/images/certificateBg.png" layout="fill" />
            </div>
          </div>
          <div
            className="certificate_logo"
            style={{ position: "relative", width: "120px", height: "120px" }}
          >
            <Image
              src="/images/go-learning-favicon.png"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h3>Certificate Of Completion</h3>
          <p>
            This is to certify that{" "}
            <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
              {data?.student_id.name}{" "}
            </span>
            has successfully completed{" "}
            <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
              {data?.course_id.title}
            </span>{" "}
            course on{" "}
            <span style={{ fontWeight: "bold" }}>
              {data?.createdAt.split("T")[0]}
            </span>
          </p>
          <div
            className="certificate_badge"
            style={{ position: "relative", width: "120px", height: "120px" }}
          >
            <Image
              src="/images/certificateBadge.png"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

const Example = () => {
  const componentRef = useRef();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(252,252,252)",
      }}
    >
      <ComponentToPrint ref={componentRef} />
      <ReactToPrint
        trigger={() => (
          <div
            className="certificate_download"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: "translateY(-200%)",
            }}
          >
            <a
              href="#"
              style={{
                backgroundColor: "rgb(249,175,58)",
                padding: "1rem 3rem",
                color: "white",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              Download
            </a>
          </div>
        )}
        content={() => componentRef.current}
      />
    </div>
  );
};

export default Example;
