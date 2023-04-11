import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import Logo from "../assests/images/logo.png";
import Profile from "../assests/images/profile.jpeg";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* ------------------Company Logo and Name-----------------------------*/}
      <div
        className={`bg-mainColor h-100vh p-5 pt-8 ${
          open ? "w-210 " : "w-78"
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-primary text-slate-50 text-3xl rounded-full absolute -right-3  border border-x-textColor cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <img
          src={Logo}
          alt="logo"
          className={`rounded-md text-4xl max-h-8 cursor-pointer block float-left mr-2   ${
            !open && "max-h-8  rotate-[360deg] duration-500"
          }`}
        />
        <h1
          className={` text-textColor font-bold origin-left  text-sm mt-2 mr-2 duration-300 ${
            !open && "scale-0"
          }`}
        >
          Dashboard Basix
        </h1>

        {/* ------------------Profile Name And Picture-----------------------------*/}

        <div>
          <img
            src={Profile}
            alt="Profile"
            className={`cursor-pointer border-solid border-2 border-sky-500 ${
              open ? "mt-10  rounded-full " : "m-0  rounded-full "
            } `}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
