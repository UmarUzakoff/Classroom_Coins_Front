import React from "react";
import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";

const CertificateModal = ({ showModal, handleOpen, img }) => {
  return (
    <Dialog
      open={showModal}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}>
      <DialogBody divider={true} className="p-0">
        <img
          alt="Certificate"
          className="h-auto w-full object-cover object-center"
          src={img}
        />
      </DialogBody>
    </Dialog>
  );
};

export default CertificateModal;
