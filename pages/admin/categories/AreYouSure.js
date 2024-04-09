import { Modal, Typography } from "antd";
import React, { Fragment, useState } from "react";

export default function AreYouSure({ children, onOk, okText }) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment key={`AreYouSure${open}`}>
      {children &&
        React.cloneElement(children, {
          onClick: () => setOpen(true),
        })}

      <Modal
        visible={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          setOpen(false);
          onOk();
        }}
        okText={okText}
      >
        <Typography.Title
          style={{ textAlign: "center", fontSize: "18px", marginTop: "20px" }}
        >
          Are you sure you want to delete this item?
        </Typography.Title>
        <Typography.Paragraph style={{ textAlign: "center" }}>
          You won't be able to undo this Record
        </Typography.Paragraph>
      </Modal>
    </Fragment>
  );
}
