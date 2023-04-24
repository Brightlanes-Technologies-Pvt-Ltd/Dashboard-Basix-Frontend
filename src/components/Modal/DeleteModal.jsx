import React from "react";

import { MdDeleteOutline } from "react-icons/md";
import Button from "../Button/Button";

const DeleteModal = () => {
  return (
    <>
      <div className=" flex align-middle items-center justify-center pb-5 ">
        <div className="flex align-middle items-center  rounded-md bg-white justify-center  ">
          <div className="flex flex-col items-center justify-center py-15 px-6" >
            <MdDeleteOutline className="text-4xl fill-red-600" />
            <h1 className="font-bold text-slate-600  mt-2">Confirm Delete</h1>
            <h3
              className="text-slate-500 text-sm  
          mb-3"
            >
              Are you sure ?
            </h3>
            <div className="flex flex-row gap-x-10 justify-between">
              <Button
                text={"Delete"}
                color={"bg-red-700"}
                hover={"hover:bg-red-900"}
              />
              <Button
                text={"Discard"}
                color={"bg-gray-400 text-white"}
                hover={
                  "hover:bg-gray-500 hover:text-whute hover:border-blue-700s"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
