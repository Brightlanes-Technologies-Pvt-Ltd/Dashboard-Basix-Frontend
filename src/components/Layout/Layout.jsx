import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../common/Header";
import Footer from "../common/Footer/Footer";

const Layout = ({ children, heading = "" }) => {
  return (
    <>
      <div className=" overflow-hidden">
        <div className="flex flex-row  w-screen h-screen  bg-slate-100 overflow-y-auto ">
          <Sidebar className="" />
          <div className="flex-1">
            <Header heading={heading} />
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
