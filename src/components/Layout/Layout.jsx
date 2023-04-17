import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../common/Header";
import TopHeader from "../common/TopHeader";


const Layout = ({ children  , heading="" , Button=[]}) => {
  return (
    <>
      <div className="flex w-screen bg-slate-100 ">
        <div>
          <Sidebar />
        </div>
        <div className="w-screen">
          <Header heading={heading}/>
         <div>
          <TopHeader buttons={Button}/>
         {children}
         </div>
          
          </div>
      </div>
    </>
  );
};

export default Layout;
