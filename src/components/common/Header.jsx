import React from "react";

const Header = ({ heading }) => {
  return (
    <>
      <div className="border-b h-12 bg-white p-9 shadow-md ">
        <div className=" flex align-middle justify-start pl-20 -mt-4 text-4xl font-semibold text-blue-700 uppercase italic ">
          {heading}
        </div>
        <div className="flex justify-end align-middle pr-20 -mt-8"></div>
      </div>
    </>
  );
};

export default Header;
