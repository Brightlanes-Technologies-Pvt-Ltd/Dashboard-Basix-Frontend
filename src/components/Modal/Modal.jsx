import React, { useState } from "react";

const Modal = ({ isVisible, children, callback, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  if (!isVisible) return null;
  return (
    <>
      {/* <div className="fixed top-40 left-14   w-full h-screen">
        <div className="flex justify-center h-11/12 ">{children}</div>
      </div> */}
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[600px] flex flex-col">
          <button
            className="text-white text-xl place-self-end"
            onClose={() => {
              setShowModal(false);
            }}
            onClick={() => {
              onClose();
            }}
          >
            x
          </button>
          <div className="bg-white">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
