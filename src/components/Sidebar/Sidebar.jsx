import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import Logo from "../assests/images/logo.png";
import Menus from "../common/menu/MenuData";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { logOut } from "../../utils/api/authApI/authApi";
import { logout } from "../../redux/feateres/useSlice";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const userlogOut = async () => {
    const { data } = await logOut();
    toast.success(data.message, { autoClose: 1000 });
    console.log(data);

    setTimeout(() => {
      dispatch(logout());
    }, 1000);
  };

  return (
    <>
      <ToastContainer />
      <div className=" justify-center ">
        {/* ------------------Company Logo and Name-----------------------------*/}
        <div
          className={`bg-white h-screen  p-5  shadow-xl ${
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
            <Link to="/homepage">
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
            </Link>
          </div>

          {/* ------------------Profile Name And Picture-----------------------------*/}

          <div className="flex flex-col p-3">
            <ul className={`${open ? "pt-6 gap-3  " : "p-0"}`}>
              {Menus.map((menu, index) => {
                return (
                  <>
                    <Link to={menu.path}>
                      <li
                        key={index}
                        className=" text-gray-500	 py-2 px-3 cursor-pointer hover:bg-sky-100 rounded-md hover:text-blue-700 "
                      >
                        <span
                          className={`${!open ? "" : "block float-left px-4 "}`}
                        >
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
                    </Link>
                  </>
                );
              })}
            </ul>
          </div>

          <div className="py-96 px-16 align-bottom	 justify-between">
            <Button text={"logout"} callback={userlogOut} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
