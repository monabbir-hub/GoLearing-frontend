import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useAuth } from "../../providers/AuthProvider";
import { useStatic } from "../../providers/StaticProvider";
import { CreateOrderEnd } from "../../utils/EndPoints";
import Toast from "../../utils/Toast";
const allproviders = ["bkash", "nagad", "rocket"];
const providersNumber = ["01521303174", "015213031745", "01727188405"];
import ManageCouponProvider, {
  useManageCoupon,
} from "../../providers/ManageCouponProvider";
const OrderForm = ({ price, offerPrice, course_id }) => {
  const router = useRouter();
  const auth = useAuth();

  const [spinnerStatus, setSpinnerStatus] = React.useState(false);
  const [transactionId, setTransactionId] = React.useState("");
  const [provider, setProvider] = React.useState("bkash");
  const [phone, setPhone] = React.useState();
  const [myPhone, setMyPhone] = React.useState();
  const [bkashLink, setBkashLink] = React.useState("");
  const [modal, setModal] = React.useState(false);

  useEffect(() => {
    // const p = offerPrice;
    // if (offerPrice === 0) p = price;

    // this direct payment link is only for Medical Course
    if (offerPrice === 0)
      setBkashLink(
        `https://shop.bkash.com/go-technologies-ltd01866438831/pay/bdt1250/h7Y8oq`
      );
    else
      setBkashLink(
        "https://shop.bkash.com/go-technologies-ltd01866438831/pay/bdt1000/XnLHCl"
      );
  }, [price, offerPrice]);

  const staticData = useStatic();
  const { appliedCoupon, setAppliedCoupon } = useManageCoupon();
  useEffect(() => {
    setMyPhone(auth?.user?.phone);
  }, [auth]);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!myPhone) {
      Toast("err", "Personal phone number is required");
      return;
    }
    if (!transactionId) {
      Toast("err", "Transaction Id is required");
      return;
    }
    if (!provider) {
      Toast("err", "Payment provider Id is required");
      return;
    }
    if (!phone) {
      Toast("err", "Transaction phone number is required");
      return;
    }
    console.log(e);
    // if (!auth?.user?._id) {
    //   router.push('/profile-authentication')
    //   return
    // }
    setSpinnerStatus(true);
    try {
      const res = await axios.post(
        CreateOrderEnd,
        {
          course_id: router?.query?.id,
          bkash_transaction_id: transactionId,
          payment_provider: provider,
          provider_number: phone,
          phone: myPhone,
          coupon: appliedCoupon,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );
      if (res.status === 200) {
        Toast("success", "Order created!");
        router.push("/");
        setProvider("bkash");
        setPhone("null");
        setTransactionId("");
        setSpinnerStatus(false);
      } else throw new Error(res?.data?.msg);
    } catch (error) {
      Toast("err", error?.response?.data?.msg || "Try again later!");
      setSpinnerStatus(false);
    }
  };
  return (
    <div className="" style={{ position: "relative" }}>
      <div className="mx-auto row ">
        <form
          onSubmit={handleOrder}
          className="col-lg-6 col-md-8 col-sm-12"
          style={{ width: "100%" }}
        >
          <div style={{ width: "100%", textAlign: "center" }}>
            <img
              src="/images/bkash_qr.jpeg"
              alt=""
              height="200px"
              width="200px"
            />
          </div>

          <div className="d-flex justify-content-start align-items-center flex-wrap">
            {/*<div className="d-flex justify-content-center align-items-center me-4">
              <Form.Check
                // label='Bkash'
                name="provider"
                type="radio"
                id="0"
                checked={provider === "bkash" ? true : false}
                inline
                onChange={(e) => setProvider(allproviders[e.target.id])}
              />
              <img src="/images/bkash.png" alt="" height="40px" width="80px" />
            </div>
            <div className="d-flex justify-content-center align-items-center me-4">
              <Form.Check
                // label='Nagad'
                inline
                name="provider"
                type="radio"
                id="1"
                checked={provider === "nagad" ? true : false}
                onChange={(e) => setProvider(allproviders[e.target.id])}
              />
              <img src="/images/nagad.png" alt="" height="30px" width="60px" />
            </div>

            <div className="d-flex justify-content-center align-items-center me-4">
              <Form.Check
                inline
                // label='Rocket'
                name="provider"
                type="radio"
                id="2"
                checked={provider === "rocket" ? true : false}
                onChange={(e) => setProvider(allproviders[e.target.id])}
              />
              <img src="/images/rocket.png" alt="" height="20px" width="40px" />
              </div>*/}
          </div>

          <h5 className="mt-4 mb-3  text-dark">
            Please complete your{" "}
            <span className="text-danger fw-bold">
              {provider.toUpperCase()}
            </span>{" "}
            payment to{" "}
            <span className="text-danger fw-bold">
              {" "}
              {provider === "bkash"
                ? staticData?.data?.bkash_number
                : provider === "nagad"
                ? staticData?.data?.nagad_number
                : staticData?.data?.rocket_number}
            </span>
            , then fill up the form below{" "}
          </h5>

          <div className="form-group mt-3">
            <label>Your phone number*</label>
            <input
              type="phone"
              className="form-control"
              placeholder="enter your personal number"
              value={myPhone || ""}
              onChange={(e) => setMyPhone(e.target.value)}
            />
          </div>
          <div className="form-group ">
            <label>{provider.toLocaleUpperCase()} Transaction Id*</label>
            <input
              type="text"
              className="form-control"
              placeholder="transaction id"
              value={transactionId || ""}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>{provider.toLocaleUpperCase()} Number(Sent From)*</label>
            <input
              type="phone"
              className="form-control"
              placeholder="Sent from"
              value={phone || ""}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="direct_payment"
          >
            {course_id == "635389bea60d65dc8556ace1" && (
              <>
                <div
                  className=" default-btn p-5 py-3 justify-content-center align-items-center"
                  style={{
                    display: provider == "bkash" ? "flex" : "none",
                    backgroundColor: "#E1146E",
                    marginBottom: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => setModal(true)}
                >
                  Direct Bkash Payment
                </div>
                <div
                  className="bkash_modal"
                  style={{
                    position: "absolute",
                    width: "320px",
                    height: "auto",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    overflow: "hidden",
                    display: modal ? "block" : "none",
                    boxShadow: "0px 2px 10px 10px rgba(0,0,0,.05)",
                    zIndex: "1000",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "1rem 1.5rem",
                      alignItems: "center",
                    }}
                  >
                    <h3>Instructions</h3>
                    <div
                      onClick={() => setModal(false)}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      &#10005;{" "}
                    </div>
                  </div>
                  <ul>
                    <li>Must add your mobile number as reference</li>
                    <li>Provide necessary informations</li>
                    <li>
                      After successful payment, copy the transaction id and use
                      it on this order page
                    </li>
                  </ul>
                  <a
                    href={bkashLink}
                    style={{ color: "white" }}
                    target="_blank"
                    onClick={() => setModal(false)}
                  >
                    <div
                      className=" default-btn p-3 py-2 justify-content-center align-items-center"
                      style={{
                        display: provider == "bkash" ? "flex" : "none",
                        backgroundColor: "#E1146E",
                        borderRadius: "0",
                        width: "100%"
                      }}
                    >
                      Pay Now
                    </div>
                  </a>
                </div>
              </>
            )}
            <button
              type="submit"
              className=" default-btn p-5 py-3 d-flex justify-content-center align-items-center"
              style={{ marginBottom: "1rem" }}
            >
              Submit{spinnerStatus && <Spinner animation="border" size="sm" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
