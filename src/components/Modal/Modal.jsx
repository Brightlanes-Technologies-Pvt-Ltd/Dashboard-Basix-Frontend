import React from "react";

const Modal = ({ children }) => {
  return (
    <>
      <div className="fixed top-40 left-14   w-full h-screen">
        <div className="flex justify-center h-11/12 ">{children}</div>
      </div>
    </>
  );
};

export default Modal;
