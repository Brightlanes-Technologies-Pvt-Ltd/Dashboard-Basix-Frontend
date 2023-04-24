import React from "react";
import Logo from "../../assests/images/logo.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <div
        className="bg-gray-50  items-start shadow-xl
      p-0.5"
      >
        <div className="p-5 flex justify-start">
          <Link to="/homepage">
            <img
              src={Logo}
              alt="logo"
              className="rounded-md text-4xl max-h-12 flex cursor-pointer items-start justify-start   "
            />
          </Link>
          <div className="flex items-center justify-center">
            <h1 className=" text-blue-700 font-bold ml-5">Dashboard Basix</h1>
            <h1 className=" text-gray-500   ml-5">
              © 2023 All rights reserved
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
