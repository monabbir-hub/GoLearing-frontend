import { cloneElement, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { API } from "../../../api";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Textarea from "../shared/Textarea";

Modal.setAppElement("#modal");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "500px",
    maxHeight: "90vh",
    overflowX: "hidden",
  },
};

export default function PreviewOrderDetails({ children, data }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {children &&
        cloneElement(children, {
          onClick: () => setOpen(true),
        })}
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
        contentLabel="Order Details"
      >
        <h3 className="page-title">Order Details</h3>

        <div className="d-flex mb-2">
          <span style={{ flex: 1 }}>
            <strong>ID</strong>
          </span>
          <span style={{ flex: 1, wordBreak: "break-all" }}>{data._id}</span>
        </div>
        <div className="d-flex mb-2">
          <span style={{ flex: 1 }}>
            <strong>TRANSACTION ID</strong>
          </span>
          <span style={{ flex: 1, wordBreak: "break-all" }}>
            {data.bkash_transaction_id}
          </span>
        </div>
        <div className="d-flex mb-2">
          <span style={{ flex: 1 }}>
            <strong>STATUS</strong>
          </span>
          <span style={{ flex: 1, wordBreak: "break-all" }}>{data.status}</span>
        </div>
        <div className="d-flex mb-2">
          <span style={{ flex: 1 }}>
            <strong>COUPON</strong>
          </span>
          <span style={{ flex: 1, wordBreak: "break-all" }}>{data.coupon}</span>
        </div>
        <div className="d-flex mb-2">
          <span style={{ flex: 1 }}>
            <strong>COURSE</strong>
          </span>
          <span style={{ flex: 1, wordBreak: "break-all" }}>
            {data.details.course?.title || "N/A"}
          </span>
        </div>
        <div className="d-flex mb-2">
          <span style={{ flex: 1 }}>
            <strong>STUDENT NAME</strong>
          </span>
          <span style={{ flex: 1, wordBreak: "break-all" }}>
            {data.student_id?.name || "N/A"}
          </span>
        </div>
        <div className="d-flex mb-2">
          <span style={{ flex: 1 }}>
            <strong>STUDENT EMAIL</strong>
          </span>
          <span style={{ flex: 1, wordBreak: "break-all" }}>
            {data.student_id?.email || "N/A"}
          </span>
        </div>
      </Modal>
    </>
  );
}
