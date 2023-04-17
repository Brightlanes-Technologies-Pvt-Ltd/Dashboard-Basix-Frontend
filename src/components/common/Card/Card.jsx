import React from "react";

const Card = ({ children }) => {
  return (
    <div className="">
      <div className={`grid`}>
        <div className="flex  gap-4 align items-center justify-center p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
