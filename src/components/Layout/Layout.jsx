import React from "react";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex w-screen bg-slate-100 ">
        <div>
          <Sidebar />
        </div>
        <div className="w-screen">{children}</div>
      </div>
    </>
  );
};

export default Layout;
