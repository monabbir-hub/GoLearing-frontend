import React from "react";
import LoginForAdmin from "../components/ProfileAuthentication/LoginForAdmin";
import Footer from "../components/_App/Footer";
import Footer2 from "../components/_App/Footer2";
import Navbar from "../components/_App/Navbar";

const AdminAuthentication = () => {
  return (
    <React.Fragment>
      <Navbar />

      <div className="profile-authentication-area ptb-100">
        <div className="container">
          <div>
            <LoginForAdmin />
          </div>
        </div>
      </div>

      <Footer2 />
    </React.Fragment>
  );
};

export default AdminAuthentication;
