import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import Logo from "../assests/images/logo.png";
import Menus from "../common/menu/MenuData";
import { MdSpaceDashboard } from "react-icons/md";
const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* ------------------Company Logo and Name-----------------------------*/}
      <div
        className={`bg-white h-screen p-5 pt-8 shadow-xl ${
          open ? "w-72 " : "w-20"
        } duration-300 relative`}
      >
        <div className={`${open ? " p-4" : ""}`}>
          <BsArrowLeftShort
            className={`bg-indigo-950 text-slate-50 text-3xl rounded-full absolute -right-3   cursor-pointer ${
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
            className={` text-indigo-950 font-bold origin-left  text-lg mt-2 mr-2 duration-300 ${
              !open && "scale-0"
            }`}
          >
            Dashboard Basix
          </h1>
        </div>
        {/* ------------------Profile Name And Picture-----------------------------*/}

        <ul className={`${open?"pt-6 gap-3  ":"p-0"}`}>
          {Menus.map((menu, index) => {
            return (
              <>
                <li
                  key={index}
                  className=" text-gray-500	 p-3 cursor-pointer hover:bg-sky-100 rounded-md hover:text-blue-700 "
                >
                  <span className=" block float-left mt-0 mr-2">
                    {menu.icon ? menu.icon : <MdSpaceDashboard />}
                  </span>
                  <span
                    className={` text-md font-bold flex-1 ml-1 ${
                      !open && "hidden"
                    }`}
                  >
                    {menu.title}
                  </span>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
