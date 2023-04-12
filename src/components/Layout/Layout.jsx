import React from "react";
import Homepage from "../Homepage/Homepage";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <Homepage />
    </div>
  );
};

export default Layout;
