import { useRouter } from "next/router";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../../../components/_App/Footer";
import Navbar from "../../../components/_App/Navbar";
import { useAuth } from "../../../providers/AuthProvider";

const AdminProfile = () => {
  const auth = useAuth();

  const router = useRouter();
  return (
    <div>
      <Navbar />
      <div className="mt-20 mb-5">
        <div className="container">
          <button
            className="mb-5 btn btn-danger fw-bold d-flex justify-content-between align-items-center"
            onClick={() => router.push("/admin/courses")}
          >
            {" "}
            <FaArrowLeft className="me-1" /> Back
          </button>
          <h2 className="fw-bold ">My Profile</h2>
          <div className="row">
            <div className="col">
              <h4>
                <strong>Name: </strong> {auth?.admin?.name}
              </h4>
              <h4>
                <strong>Email: </strong> {auth?.admin?.email}
              </h4>
              <h4>
                <strong>ID: </strong> {auth?.admin?._id}
              </h4>
              <h4>
                <strong>Phone: </strong> {auth?.admin?.phone}
              </h4>

              <h4>
                <strong>Roles: </strong>{" "}
                {auth?.admin?.role?.length > 0 &&
                  auth?.admin?.role?.map((r) => r + ", ")}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminProfile;
