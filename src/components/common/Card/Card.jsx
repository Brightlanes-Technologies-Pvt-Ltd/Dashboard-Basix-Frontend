import React from "react";

const Card = ({ children }) => {
  return (
    <>
      <div className="   flex align-middle items-center justify-center  ">
        <div className="flex align-middle items-center shadow-md rounded-md bg-white justify-center  ">
          {children}
        </div>
      </div>
    </>
  );
};

export default Card;
