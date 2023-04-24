import React from "react";
import Input from "../common/Input/Input";
import { AiOutlineForm } from "react-icons/ai";

const Profileform = () => {
  return (
    <>
      <div className="flex  justify-center bg-blue-50 bg-opacity-50 p-28 ">
        <div className="flex flex-col  bg-white px-12 pt-8 pb-10 justify-start gap-6 shadow-lg">
          <div className="flex justify-between ">
            <div className="text-lg font-medium text-slate-500 flex justify-center">
              <h1>Teacher's Profile</h1>
            </div>
            <AiOutlineForm className="text-2xl fill-slate-400 hover:fill-blue-700" />
          </div>
          <div className="flex flex-col  bg-white p-5 justify-center gap-8 border rounded-lg">
            <div className="flex flex-row gap-x-4">
              <Input
                label={"First Name"}
                placeholder={"First Name"}
                type={"text"}
                name="firstName"
                value={""}
              />
              <Input
                placeholder={"Last Name"}
                type={"text"}
                name="lastName"
                value={""}
                label={"Last Name"}
              />
            </div>
            <Input
              placeholder={"Email"}
              type={"input"}
              name="email"
              value={""}
              label={"Email"}
            />
            <div className="flex flex-row justify-items-start gap-36 ">
              {" "}
              <Input
                placeholder={"Date of Birth"}
                type={"Date"}
                name="dateOfBirth"
                value={""}
                label={"Date oF Birth"}
              />
              <Input
                placeholder={"Date of joining"}
                type={"Date"}
                name="joiningDate"
                value={""}
                label={"Date of Joining"}
              />
            </div>
            <div className="flex flex-row gap-x-4 ">
              <Input
                placeholder={"Mobile Number"}
                type={"tel"}
                name=""
                value={""}
                label={"Mobile Number"}
              />
              <Input
                placeholder={"Charges"}
                type={"input"}
                name="rate"
                value={""}
                label={"Charges"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profileform;
