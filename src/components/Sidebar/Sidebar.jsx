import React, { useState } from "react";
import {
  BsArrowLeftShort,
  BsArrowRight,
  BsArrowRightCircle,
  BsBoxArrowRight,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Logo from "../assests/images/logo.png";
import Menus from "../common/menu/MenuData";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { logOut } from "../../utils/api/authApI/authApi";
import { logout } from "../../redux/feateres/useSlice";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

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
              {Menus.map((menu, index) => {
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

            <div className="flex pt-72  justify-center align-bottom items-center">
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
//   const [open, setOpen] = useState(true);
//   const dispatch = useDispatch();
//   const userlogOut = async () => {
//     const { data } = await logOut();
//     toast.success(data.message, { autoClose: 1000 });
//     console.log(data);

//     setTimeout(() => {
//       dispatch(logout());
//     }, 1000);
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className=" justify-center ">
//         {/* ------------------Company Logo and Name-----------------------------*/}
//         <div
//           className={`flex flex-col  h-screen px-5 py-8  bg-gray-50 border-r dark:bg-white ${
//             open ? "w-72 " : "w-20"
//           } duration-300 relative`}
//         >
//           <div className={`${open ? " p-4" : ""}`}>
//             <BsArrowLeftShort
//               className={`bg-indigo-950 text-slate-50 text-3xl rounded-full absolute -right-3   cursor-pointer ${
//                 !open && "rotate-180"
//               }`}
//               onClick={() => setOpen(!open)}
//             />
//             <Link to="/homepage">
//               <img
//                 src={Logo}
//                 alt="logo"
//                 className={`rounded-md text-4xl max-h-8 cursor-pointer block float-left mr-2   ${
//                   !open && "max-h-8  rotate-[360deg] duration-500"
//                 }`}
//               />
//               <h1
//                 className={` text-indigo-950 font-bold origin-left  text-lg mt-2 mr-2 duration-300 ${
//                   !open && "scale-0"
//                 }`}
//               >
//                 Dashboard Basix
//               </h1>
//             </Link>
//           </div>

//           {/* ------------------Profile Name And Picture-----------------------------*/}

//           <div className="flex flex-col p-3">
//             <ul className={`${open ? "pt-6 gap-3  " : "p-0"}`}>
//               {Menus.map((menu, index) => {
//                 return (
//                   <>
//                     <Link to={menu.path}>
//                       <li
//                         key={index}
//                         className=" text-gray-500	 py-2 px-3 cursor-pointer hover:bg-sky-100 rounded-md hover:text-blue-700 "
//                       >
//                         <span
//                           className={`${!open ? "" : "block float-left px-4 "}`}
//                         >
//                           {menu.icon ? menu.icon : <MdSpaceDashboard />}
//                         </span>

//                         <span
//                           className={` text-md font-bold flex-1 ml-1 ${
//                             !open && "hidden"
//                           }`}
//                         >
//                           {menu.title}
//                         </span>
//                       </li>
//                     </Link>
//                   </>
//                 );
//               })}
//             </ul>
//           </div>

//           <div className="py-96 px-16 align-bottom	 justify-between">
//             <Button text={"logout"} callback={userlogOut} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

export default Sidebar;
