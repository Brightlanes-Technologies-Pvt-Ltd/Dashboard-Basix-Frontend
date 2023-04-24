import React from "react";
import { GrFormClose } from "react-icons/gr";
const Modal = ({ visible, onClose, ModalHeading, children, topicId }) => {
  const handleOnclose = (e) => {
    if (e.target.id === "container") onClose();
  };

  if (!visible) return null;

  return (
    <>
      <div
        id="container"
        onClick={handleOnclose}
        className="fixed inset-0 bg-black  bg-opacity-20 backdrop-blur-sm flex   lef-1/2  justify-center items-center"
      >
        <div className="flex flex-col bg-white p-2 rounded shadow-md ">
          <GrFormClose onClick={onClose} className="cursor-pointer" />
          <div className=" flex justify-center mx-3 text-sm font-semibold tracking-wide text-slate-700">
            {ModalHeading}
          </div>
          <div> {children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
