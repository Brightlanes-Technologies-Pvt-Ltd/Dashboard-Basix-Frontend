import React, { useState } from "react";
import Input from "../common/Input/Input";
import { AiOutlineForm } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import { updateTeacherProfile } from "../../utils/api/authApI/TeacherApI";
import { toast } from "react-toastify";
import { login } from "../../redux/feateres/useSlice";

const TeacherProfileform = () => {
  const { user } = useSelector((state) => state.user);

  const [disabledForm, setDisabledForm] = useState({
    disabled: true,
    color: "bg-gray-200",
  });

  const [userData, setUserData] = useState({
    ...user,
  });
  console.log("user", userData);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const updateProfile = async () => {
    try {
      const {
        data: { updatedTeacherData },
      } = await updateTeacherProfile(userData);
      setUserData({ ...updatedTeacherData });
      toast.success("Profile Updated Successfully");
      dispatch(login(updatedTeacherData));
      setDisabledForm({ disabled: true, color: "bg-gray-200" });

      console.log("updatedate", updatedTeacherData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex  justify-center bg-blue-50 bg-opacity-50 py-10 px-16 ">
        <div className="flex flex-col  bg-white px-12 pt-8 pb-10 justify-start gap-6 shadow-lg">
          <div className="flex justify-between ">
            <div className="text-lg font-medium text-slate-500 flex justify-center">
              <h1>Teacher's Profile</h1>
            </div>
            <AiOutlineForm
              className="text-2xl fill-slate-400 hover:fill-blue-700"
              onClick={() => {
                setDisabledForm({ disabled: false, color: "" });
              }}
            />
          </div>
          <div className="flex flex-col  bg-white p-5 justify-center gap-8 border rounded-lg">
            <div className="flex flex-row gap-x-4">
              <Input
                label={"First Name"}
                placeholder={"First Name"}
                type={"text"}
                name="firstName"
                value={userData.firstName}
                callback={handleInputChange}
                disabled={disabledForm.disabled}
                color={disabledForm.color}
              />
              <Input
                placeholder={"Last Name"}
                type={"text"}
                name="lastName"
                value={userData.lastName}
                label={"Last Name"}
                callback={handleInputChange}
                disabled={disabledForm.disabled}
                color={disabledForm.color}
              />
            </div>
            <Input
              placeholder={"Email"}
              type={"input"}
              name="email"
              value={userData.email}
              label={"Email"}
              callback={handleInputChange}
              disabled={true}
              color="bg-gray-200"
            />
            <div className="flex flex-row justify-items-start gap-36 ">
              <Input
                placeholder={"Date of Birth"}
                type={"Date"}
                name="dateOfBirth"
                value={
                  userData.dateOfBirth && userData.dateOfBirth.split("T")[0]
                }
                callback={handleInputChange}
                label={"Date oF Birth"}
                disabled={disabledForm.disabled}
                color={disabledForm.color}
              />
              <Input
                placeholder={"Date of joining"}
                type={"Date"}
                name="joiningDate"
                value={
                  userData.joiningDate && userData.joiningDate.split("T")[0]
                }
                callback={handleInputChange}
                label={"Date of Joining"}
                disabled={disabledForm.disabled}
                color={disabledForm.color}
              />
            </div>
            <div className="flex flex-row gap-x-4 ">
              <Input
                placeholder={"Mobile Number"}
                type={"tel"}
                name="mobileNumber"
                callback={handleInputChange}
                value={userData.mobileNumber}
                label={"Mobile Number"}
                disabled={disabledForm.disabled}
                color={disabledForm.color}
              />
              <Input
                placeholder={"Charges"}
                type={"input"}
                name="rate"
                callback={handleInputChange}
                value={userData.rate}
                label={"Charges"}
                disabled={true}
                color="bg-gray-200"
              />
            </div>
          </div>
          <div>
            <Button text={"update"} callback={updateProfile} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherProfileform;
