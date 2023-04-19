import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../common/Header";
import TopHeader from "../common/TopHeader";

const Layout = ({ children, heading = "", Button = [] }) => {
  return (
    <>
      <div className="  ">
        <div className="flex flex-row  w-screen h-screen  bg-slate-100">
          <Sidebar />
          <div className="flex-1">
            <Header heading={heading} />
            <div>
              <TopHeader buttons={Button} />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
