import React from "react";
import Button from "../Button/Button";
import { logout } from "../../redux/feateres/useSlice";
import { logOut } from "../../utils/api/authApI/authApi";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Header = ({ heading }) => {
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
      <div className="border-b h-12 ">
        <p className="py-3 px-3">{heading}</p>
        <div className="flex justify-end align-middle pr-20 -top-6">
        
          <Button text={"logout"} callback={userlogOut} />
        </div>
      </div>
    </>
  );
};

export default Header;
