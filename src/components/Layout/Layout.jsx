import React from "react";
import Homepage from "../Homepage/Homepage";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Homepage />
    </div>
  );
};

export default Layout;
