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

const MyProfile = () => {
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
          'x-access-token': localStorage.getItem('x-access-token'),
        },
      });

      if (res?.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "New OTP sent. Please check your email inbox!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#fe4a55",
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
            'x-access-token': localStorage.getItem('x-access-token'),
          },
        }
      );

      if (res?.status === 200) {
        auth.getUserInfo(localStorage.getItem('x-access-token'));
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
    <div>
      <Navbar />

      <div className="ptb-100">
        <div className="container">
          <h2 className="fw-bold mb-5">My Profile</h2>
          <div className="row">
            {/* <div className='col-lg-4'>
              <div className='user-profile'>
                <img src='/images/success-people/success-people3.jpg' />
              </div>
            </div> */}

            <div className="col">
              <h4>
                <strong>Name: </strong> {auth?.user?.name}
              </h4>
              <h4>
                <strong>Email: </strong> {auth?.user?.email}
              </h4>
              <h4>
                <strong>Phone: </strong> {auth?.user?.phone}
              </h4>

              <h4>
                <strong>Verified: </strong>{" "}
                {auth?.user?.verified ? "Yes" : "No"}
              </h4>

              <h4>
                <strong>Created At: </strong>{" "}
                {auth?.user?.createdAt?.slice(0, 10)}
              </h4>
              <button
                className="default-btn pe-5"
                onClick={() => router.push("/user/edit-profile")}
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div style={{ minHeight: "15rem" }}>
            {!auth?.user?.verified ? (
              <div className="py-5">
                <h2 className="fw-bold mb-3">Verify Account</h2>
                <button
                  className="default-btn d-flex justify-content-center align-items-center"
                  onClick={() => {
                    SendNewOtp();
                  }}
                  // disabled={submissionTime === 0 ? false : true}
                  // style={{ cursor: submissionTime > 0 && 'not-allowed' }}
                >
                  Send new OTP request
                  {spinner && <Spinner animation="border" size="sm" />}
                </button>
                <p className="mt-2 ms-2">
                  After sent an OTP, it will expired automatically after 3
                  minutes.
                </p>
                {/* {otpSubmissionArea && (
                <p className='mt-2 ms-2'>
                  {submissionTime > 0 &&
                    `${submissionTime} seconds left to submit OTP`}
                </p>
              )} */}
                <br />
                <div>
                  <label className="fw-bold mt-4">
                    Please input the OTP code that we sent to your email
                  </label>
                  <input
                    type="text"
                    value={otp}
                    className="form-control my-4"
                    style={{ maxWidth: "40rem" }}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="example 44231"
                  />
                  <button
                    className="default-btn pe-5 default-btn d-flex justify-content-center align-items-center"
                    onClick={() => SubmitOtp()}
                  >
                    Submit{" "}
                    {otpSpinner && <Spinner animation="border" size="sm" />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-5"></div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default withProtected(MyProfile);
