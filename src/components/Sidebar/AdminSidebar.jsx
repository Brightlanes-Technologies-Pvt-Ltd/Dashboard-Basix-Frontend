import React, { useState } from "react";

import { Link } from "react-router-dom";
import Logo from "../assests/images/logo.png";
import { useDispatch } from "react-redux";
import { logOut } from "../../utils/api/authApI/authApi";
import { ToastContainer, toast } from "react-toastify";
import { logout } from "../../redux/feateres/useSlice";
import Menus from "../common/menu/MenuData";
import Button from "../Button/Button";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import AdminMenus from "../common/menu/AdminMenuData";
import { BsArrowRight, BsBoxArrowRight } from "react-icons/bs";

const AdminSideBar = () => {
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
      {" "}
      <ToastContainer />
      <aside
        className={`flex flex-col  h-screen px-5 py-8 overflow-y-auto bg-gray-50 border-r dark:bg-white shadow-lg relative ${
          open ? "w-60 " : "w-20 "
        }`}
      >
        <div>
          {" "}
          <BsArrowRight
            className={`  text-white text-4xl   absolute -right-0 -top-0   cursor-pointer ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
          <Link to="/homepage">
            <img
              src={Logo}
              alt="logo"
              className={`rounded-md text-4xl max-h-8 cursor-pointer block float-left mr-2  mt-3  ${
                !open && " rotate-[360deg] duration-500"
              }`}
            />
            <h1
              className={` text-indigo-950 font-bold mt-3   text-lg duration-300 ${
                !open && "scale-0 "
              }`}
            >
              Dashboard Basix
            </h1>
          </Link>
        </div>

        <div className={`  ${!open ? "" : "flex flex-col mt-6"}`}>
          <nav className="flex-1 -mx-3 space-y-3 ">
            <ul>
              {AdminMenus.map((menu, index) => {
                return (
                  <Link
                    className="flex items-center px-4 py-4 text-gray-500 transition-colors duration-300 transform rounded-lg   dark:hover:bg-sky-200 dark:hover:text-blue-700 hover:text-blue-700"
                    to={menu.path}
                    key={index}
                  >
                    <li>
                      <div className="flex flex-row">
                        <span>
                          {" "}
                          {React.cloneElement(menu.icon, {
                            className: " h-6 w-6 ",
                          })}
                        </span>
                        <span
                          className={`mx-2 text-md font-bold ${
                            !open && "hidden"
                          }`}
                        >
                          {menu.title}
                        </span>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>

            <div className="flex pt-96  justify-center align-bottom items-center">
              <Button
                text={"Log out"}
                callback={userlogOut}
                className={`"mt-2 self-center flex flex-row text-sm text-white shadow-md shadow-red-800 hover:text-white  px-4 py-3 rounded-[12px]  drop-shadow-xl font-semibold  ${
                  !open && "hidden"
                } `}
                color={"bg-red-700"}
                hover={"hover:bg-red-900"}
                Icon={<BsBoxArrowRight className={`text-xl ml-2 `} />}
              />
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};
export default AdminSideBar;
