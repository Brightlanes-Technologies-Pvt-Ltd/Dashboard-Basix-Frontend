import React from "react";
import Input from "../components/common/Input/Input";
import { useState } from "react";
import Logo from "../components/assests/images/logo.png";
import { LogIn, teacherLogIn } from "../utils/api/authApI/authApi";
import { login } from "../redux/feateres/useSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";

// import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loginAs, setLoginAs] = useState("");
  const getUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      if (loginAs === "admin") {
        const { data } = await LogIn(userData);
        console.log(data);
        dispatch(login(data.user));
        navigate("/homepage");
      } else if (loginAs === "teacher") {
        const { data } = await teacherLogIn(userData);
        console.log(data);
        dispatch(login(data.user));
        navigate("/homepage");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(loginAs);
  return (
    <>
      <div className="flex justify-center items-center  mt-10 ">
        <div className={`flex flex-col w-96  p-8  gap-3 bg-white shadow-lg `}>
          <div className="flex  gap-4 align items-center justify-center p-5">
            <img
              src={Logo}
              alt="logo"
              className={`rounded-md text-4xl w-10 h-10 cursor-pointer block float-left mr-2   `}
            />
            <h1 className={`text-center text-3xl text-gray-900`}>Log-In</h1>
          </div>

          <div
            className={`flex flex-col w-86 border-2 p-8 rounded-lg gap-3 opacity`}
          >
            <div className="flex flex-col text-start text-sm text-gray-500 font-semibold">
              Login to your basix account
            </div>
            <div className="grid gap-4 grid-cols- grid-rows-3">
              <Input
                label={"Email"}
                type={"email"}
                name={"email"}
                value={userData.email}
                callback={getUserData}
                placeholder={"Enter your Email"}
              />

              <Input
                label={"Password"}
                type={"password"}
                name={"password"}
                value={userData.password}
                callback={getUserData}
                placeholder={"Enter your Password"}
              />
              <div>
                <p>Login as </p>
                <div className="flex gap-3">
                  <input
                    type="radio"
                    id="admin"
                    name="loginAs"
                    value="admin"
                    onClick={(e) => setLoginAs(e.target.value)}
                  />
                  <label htmlFor="admin">Admin</label>
                  <input
                    type="radio"
                    id="teacher"
                    name="loginAs"
                    value="teacher"
                    onClick={(e) => setLoginAs(e.target.value)}
                  />
                  <label htmlFor="teacher">Teacher</label>
                </div>
              </div>

              {/* Name input section */}

              <div className={`flex flex-col gap-5`}>
                <Button text={"Login"} callback={onFormSubmit} />

                <p className={`text-xs text-center`}>
                  Don't have an account{" "}
                  <span
                    className={`text-sky-700 hover:cursor-pointer hover:text-sky-500`}
                  >
                    Create New Account
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
