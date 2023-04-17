import React from "react";
import Button from "../Button/Button";

const TopHeader = ({ buttons }) => {

  return (
    <div className=" flex justify-end px-5 py-2 ">
      <div className="z-10">
        {buttons.length > 0
          ? buttons.map(({ text, callback }) => {
              return <Button onClick={callback}>{text}</Button>;
            })
          : ""}
      </div>
    </div>
  );
};

export default TopHeader;
