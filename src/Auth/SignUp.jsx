import React from "react";
import Input from "../components/common/Input/Input";
import { useState } from "react";
import Logo from "../components/assests/images/logo.png";

// import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    contact_number: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    postcode: "",
  });
  const getUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  //   const navigate = useNavigate();

  return (
    <>
      <div className=" flex justify-center items-center mt-3 ">
        <div className={`flex flex-col w-86  px-8 py-4   gap-3  bg-white`}>
          <div className="flex  gap-4 align items-center justify-center p-5">
            <img
              src={Logo}
              alt="logo"
              className={`rounded-md text-4xl w-10 h-10 cursor-pointer block float-left mr-2   `}
            />
            <h1 className={`text-center text-3xl text-gray-900`}>Sign-Up</h1>
          </div>

          <div
            className={`flex flex-col w-86 border-2 p-8 rounded-lg gap-3 opacity`}
          >
            <div className="flex flex-col text-start text-sm text-gray-500 font-semibold">
              Fill your personal details to get your basix account
            </div>
            <div className="grid gap-4 grid-cols-1 grid-rows-3">
              <Input
                className="flex flex-col"
                label={"First Name"}
                type={"text"}
                name={"first_name"}
                value={userData.first_name}
                placeholder={"Enter your First Name"}
                callback={getUserData}
              />
              <Input
                label={"Last Name"}
                type={"text"}
                name={"last_name"}
                value={userData.last_name}
                callback={getUserData}
                placeholder={"Enter your Last Name"}
              />
              <Input
                label={"Email"}
                type={"email"}
                name={"email"}
                value={userData.email}
                callback={getUserData}
                placeholder={"Enter your Email"}
              />
              <Input
                label={"Contact Number"}
                type={"tel"}
                name={"contact_number"}
                value={userData.contact_number}
                callback={getUserData}
                placeholder={"Enter your Contact Number"}
              />
              <div className="grid gap-4 grid-cols-2 grid-rows-1">
                {" "}
                <Input
                  label={"Password"}
                  type={"password"}
                  name={"password"}
                  value={userData.password}
                  callback={getUserData}
                  placeholder={"Enter your Password"}
                />
                <Input
                  label={"Confirm Password"}
                  type={"text"}
                  name={"confirm_password"}
                  value={userData.confirm_password}
                  callback={getUserData}
                  placeholder={"Enter your Password Again"}
                />
              </div>
            </div>

            {/* Name input section */}

            <div className={`flex flex-col gap-5`}>
              <button
                className={`  mt-2 self-center text-sm text-white bg-sky-500 hover:bg-sky-700 hover:text-white block px-4 py-3 rounded-[12px]  `}
              >
                Sign up
              </button>
              <p className={`text-xs text-center`}>
                Already have an account ?{" "}
                <span
                  className={`text-sky-700 hover:cursor-pointer hover:text-sky-500`}
                >
                  Click Here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
