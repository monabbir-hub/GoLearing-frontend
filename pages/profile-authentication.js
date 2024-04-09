import React from "react";
import LoginForm from "../components/ProfileAuthentication/LoginForm";
import RegisterForm from "../components/ProfileAuthentication/RegisterForm";
import Footer from "../components/_App/Footer";
import Footer2 from "../components/_App/Footer2";
import Navbar from "../components/_App/Navbar";

const ProfileAuthentication = () => {
  return (
    <React.Fragment>
      <Navbar />

      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <h1 className=" text-center mb-5" style={{ fontWeight: "800" }}>
            Log In/ Create Account
          </h1>
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <LoginForm />
            </div>

            <div className="col-lg-6 col-md-12">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>

      <Footer2 />
    </React.Fragment>
  );
};

export default ProfileAuthentication;
