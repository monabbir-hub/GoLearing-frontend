import axios from "axios";
import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { OrderEditEnd } from "../../utils/EndPoints";
import Toast from "../../utils/Toast";

const EditOrder = ({ show, handleClose, data, loadAllEnrolledCourses }) => {
  const [editData, setEditData] = React.useState({
    id: "",
    bkash_transaction_id: "",
    payment_provider: "",
  });
  const [spinner, setSpinner] = React.useState(false);

  React.useEffect(() => {
    setEditData({
      id: data?._id,
      bkash_transaction_id: data?.bkash_transaction_id,
      payment_provider: data?.payment_provider,
    });
  }, [data]);

  const sentEditRequest = async (e) => {
    e.preventDefault();
    setSpinner(true);

    try {
      const res = await axios.put(
        OrderEditEnd,
        {
          ...editData,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token"),
          },
        }
      );
      if (res.status === 200) {
        Toast("success", "Order updated successfully!");
        setEditData({
          id: "",
          bkash_transaction_id: "",
          payment_provider: "",
        });
        handleClose();
        loadAllEnrolledCourses();
        setSpinner(false);
      } else throw new Error(res?.data?.msg || "Try again later");
    } catch (error) {
      Toast("err", error?.response?.data?.msg || "Try again later");
      setSpinner(false);
      setEditData({
        id: "",
        bkash_transaction_id: "",
        payment_provider: "",
      });
    }
  };

  const handleHide = () => {
    handleClose();
    setEditData({
      id: "",
      bkash_transaction_id: "",
      payment_provider: "",
    });
  };

  return (
    <Modal
      centered
      show={show}
      onHide={handleClose}
      style={{ border: "none" }}
      size="lg"
    >
      <Modal.Body style={{ border: "none" }}>
        <h3 className="fw-bold mb-4">Order Edit</h3>

        <form onSubmit={sentEditRequest}>
          <div className="form-group">
            <label>Id</label>
            <input
              type="text"
              value={editData?.id}
              className="form-control"
              disabled
            />
          </div>
          <div className="form-group">
            <label>Transaction Id</label>
            <input
              type="text"
              value={editData?.bkash_transaction_id}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  bkash_transaction_id: e.target.value,
                })
              }
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Payment Provider</label>
            <select className="form-control" placeholder="Username or email">
              <option
                value="bkash"
                selected={editData?.payment_provider === "bkash" ? true : false}
              >
                Bkash
              </option>
              <option
                value="nagad"
                selected={editData?.payment_provider === "nagad" ? true : false}
              >
                Nagad
              </option>
              <option
                value="rocket"
                selected={
                  editData?.payment_provider === "rocket" ? true : false
                }
              >
                Rocket
              </option>
            </select>
          </div>

          <button type="submit" className="fw-bold px-5 btn btn-danger ">
            Submit {spinner && <Spinner animation="border" size="sm" />}
          </button>
        </form>
      </Modal.Body>
      {/* <Modal.Footer style={{ border: 'none' }}>
        <Button variant='danger' className='fw-bold' onClick={handleClose}>
          Close
        </Button>
        <Button variant='danger' className='fw-bold' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default EditOrder;
