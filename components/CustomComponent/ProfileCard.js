import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import Footer from "../../components/_App/Footer";
import Navbar from "../../components/_App/Navbar";
import withProtected from "../../hooks/withProtected";
import { useAuth } from "../../providers/AuthProvider";
import { GetNewOTPEnd, PutOTPEnd } from "../../utils/EndPoints";
import Toast from "../../utils/Toast";
import { BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import classes from "../../styles/Profilecard.module.css";

const ProfileCard = () => {
  const auth = useAuth();
  const router = useRouter();

  const [otpSubmissionArea, setOtpSubmissionArea] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [submissionTime, setSubmissionTime] = useState(180);
  const [otp, setOtp] = useState("");
  const [otpSpinner, setOtpSpinner] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('x-access-token')
  //   sentOtpRequest && SendNewOtp(token)
  // }, [sentOtpRequest])

  const SendNewOtp = async () => {
    setSpinner(true);
    try {
      const res = await axios.get(GetNewOTPEnd, {
        headers: {
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      });

      if (res?.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "New OTP sent. Please check your email inbox!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#F8B03C",
        });
        // setOtpSubmissionArea(true)
        setSpinner(false);
        // setSubmissionTime(180)
      } else throw new Error(res?.data?.msg || "Try again later");
    } catch (error) {
      Toast("err", error?.response?.data?.msg || "Try again later");
      setSpinner(false);
    }
  };

  // useEffect(() => {
  //   submissionTime > 0 &&
  //     setTimeout(() => setSubmissionTime(submissionTime - 1), 1000)
  //   if (submissionTime === 0) setOtp('')
  // }, [submissionTime])

  const SubmitOtp = async () => {
    setOtpSpinner(true);

    try {
      const res = await axios.put(
        PutOTPEnd,
        {
          otp: otp,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );

      if (res?.status === 200) {
        auth.getUserInfo(localStorage.getItem("x-access-token"));
        Toast("Success", "Account verified Successfully.");
        // setOtpSubmissionArea(false)
        setOtpSpinner(false);
        setOtp("");
      } else throw new Error(res?.data?.msg || "Try again later");
    } catch (error) {
      Toast("err", error?.response?.data?.msg || "Try again later");
      setOtpSpinner(false);
      setOtp("");
    }
  };

  return (
    <div className="row container-fluid" style={{ marginTop: "50px" }}>
      <div className="col-md-3 col-sm-12">
        <img
          src={auth?.user?.photo || "/images/advisor/avatar.png"}
          width="100%"
          style={{
            borderRadius: "5%",
            marginTop: "40px",
            marginBottom: "10px",
            maxHeight: "200px",
          }}
        />
      </div>
      <div className={`col-md-9 col-sm-12 ${classes.profileInfo}`}>
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>My Account</h2>
        <p>
          <strong>
            <BiUser />{" "}
          </strong>{" "}
          {auth?.user?.name}
        </p>
        <p>
          <strong>
            <HiOutlineMail />{" "}
          </strong>{" "}
          {auth?.user?.email}
        </p>
        <p>
          <strong>
            <BsTelephone />{" "}
          </strong>{" "}
          {auth?.user?.phone}
        </p>

        {/* <p>
          <strong>Verified: </strong> {auth?.user?.verified ? "Yes" : "No"}
        </p> */}
        <p>
          <strong>
            <FaUniversity />{" "}
          </strong>{" "}
          {auth?.user?.institution || "Institution"}
        </p>
        <p>
          <strong>
            <SiGoogleclassroom />{" "}
          </strong>{" "}
          {auth?.user?.class || "class"}
        </p>

        <p>
          <strong>
            <AiFillHome />{" "}
          </strong>{" "}
          {auth?.user?.address || "address"}
        </p>

        <p>
          <strong>
            <MdDateRange />{" "}
          </strong>{" "}
          <span>Account created on </span>
          {auth?.user?.createdAt?.slice(0, 10)}
        </p>

        <div style={{ marginTop: "10px" }}>
          <button
            className="default-btn pe-5"
            onClick={() => router.push("/user/edit-profile")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};
//export default ProfileCard;
export default withProtected(ProfileCard); //this should be used afterwards for authentication
