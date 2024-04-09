import axios from "axios";
import router from "next/router";
import React, { useEffect, useState, useCallback } from "react";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../providers/AuthProvider";
import { EditStudentProfileEnd } from "../utils/EndPoints";
import Toast from "../utils/Toast";
import Input from "./admin/shared/Input";

const EditUserProfile = () => {
  // const [data, setData] = React.useState({ name: "", phone: null });
  const [data, setData] = useState();
  const [spinner, setSpinner] = useState(false);
  const [photo, setPhoto] = useState(auth?.user?.photo);
  const [name, setName] = useState(auth?.user?.name);
  const [phone, setPhone] = useState(auth?.user?.phone);
  const [inst, setInst] = useState(auth?.user?.institution);
  const [classs, setClasss] = useState(auth?.user?.class);
  const [address, setAddress] = useState(auth?.user?.address);
  const [previewImage, setPreviewImage] = useState(null);

  const auth = useAuth();

  useEffect(() => {
    setData({
      name: auth?.user?.name,
      phone: auth?.user?.phone,
      address: auth?.user?.address,
      institution: auth?.user?.institution,
      class: auth?.user?.class,
      photo: auth?.user?.photo,
    });
  }, [auth]);
  useEffect(() => {
    data && setData({ ...data, photo });
  }, [photo]);

  const submitData = async (e) => {
    // console.log(data);
    e.preventDefault();
    setSpinner(true);
    if (!data?.name || !data?.phone) {
      Toast("err", "Please fill up the required fields.");
      setSpinner(false);
      return;
    }
    try {
      const res = await axios.put(
        EditStudentProfileEnd,
        {
          ...data,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );
      if (res.status === 200) {
        setSpinner(false);
        Toast("success", "Profile Updated");
        auth?.getUserInfo(localStorage.getItem("x-access-token"));
        router.push("/my-courses");
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      setSpinner(false);
      Toast(
        "err",
        error?.response?.data?.msg || "Something went wrong! Try again later"
      );
    }
  };

  return (
    <div>
      <div className="login-form">
        <h2>Edit Profile</h2>
        <form onSubmit={submitData}>
          <div className="form-group">
            <label>Name*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              // onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone*</label>
            <input
              type="number"
              className="form-control"
              placeholder="enter your phone number"
              value={data?.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              // onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="enter your address"
              value={data?.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Institution</label>
            <input
              type="text"
              className="form-control"
              placeholder="enter your institution"
              value={data?.institution}
              onChange={(e) =>
                setData({ ...data, institution: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Class</label>
            <input
              type="text"
              className="form-control"
              placeholder="enter your class"
              value={data?.class}
              onChange={(e) => setData({ ...data, class: e.target.value })}
            />
          </div>
          <div className="form-group">
            <Input
              label="Profile Photo*"
              type="file"
              placeholder="photo"
              value={data?.photo}
              defaultFile={auth?.user?.photo}
              onFile={(file) => setPhoto(file)}
              full
              // onFile={(file) => console.log("hello " + file)}
            />
          </div>

          <button type="submit">
            Update {spinner && <Spinner animation="border" size="sm" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfile;
