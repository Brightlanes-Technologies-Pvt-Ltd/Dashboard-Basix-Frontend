import { useState } from "react";
import Dropzone from "react-dropzone";
import React from "react";

import { useDispatch } from "react-redux";
import { updateClassFromCsv } from "../../redux/feateres/classSlice";
import { createClassesFromCSV } from "../../utils/api/classApI/classApi";

import { toast, ToastContainer } from "react-toastify";
import Button from "../Button/Button";
import { createCourseFromCSV } from "../../utils/api/course_API";

const DropZone = ({ setToggle, toggle, courseId = "", onClose }) => {
  const [file, setFiles] = useState();
  const [fileName, setFileName] = useState("");
  const handleDropChange = (acceptedFiles) => {
    setFileName(acceptedFiles[0].path);

    setFiles(acceptedFiles[0]);
  };

  const dispatch = useDispatch();

  const [showEditModal, setShowEditModal] = useState(false);

  const handleOnClose = () => setShowEditModal(false);

  const uploadFromCsv = async () => {
    if (file) {
      try {
        if (courseId !== "") {
          const { data } = await createClassesFromCSV(file);
          console.log(data);
          dispatch(updateClassFromCsv(data.classes));
          toast.success("All Classes Uploaded Successfully", {
            autoClose: 1000,
          });

          setTimeout(() => {
            setToggle({
              ...toggle,
              modal: false,
            });
          }, 2000);
        } else {
          const { data } = await createCourseFromCSV(file);
          console.log(data);
          // dispatch(updateClassFromCsv(data.classes));
          toast.success("All Courses Uploaded Successfully", {
            autoClose: 1000,
          });

          setTimeout(() => {
            setToggle({
              ...toggle,
              modal: false,
            });
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("please provide a file");
    }
  };

  return (
    <div className=" w-96 gap-2 mt-8 ">
      <div className="cursor-pointer relative block  bg-white   p-15 z-100 ">
        <ToastContainer />

        <div className="flex justify-center align items-center flex-col">
          <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                {fileName === "" ? (
                  <div
                    {...getRootProps()}
                    className="dropzone upload-zone dz-clickable border p-3 w-64 flex justify-center border-dashed border-gray-500 relative"
                  >
                    <input {...getInputProps()} />

                    <div className="text-center ">
                      <span>Drag and drop file</span>
                      <p>or</p>
                      <p>Select</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span>
                      <p>Your Uploaded File </p>
                      <u>{fileName}</u>
                    </span>
                    <Button
                      onClick={uploadFromCsv}
                      outline
                      color="primary"
                      className="mx-2 btn-round"
                    >
                      Upload Data
                    </Button>
                  </div>
                )}
              </section>
            )}
          </Dropzone>
        </div>
        <div className="flex justify-between p-10">
          <Button text={"Upload"} callback={uploadFromCsv} />
          <Button
              onClick={() => setShowEditModal(false)}
            text={"Discard"}
            color={"bg-red-600 "}
            hover={"hover:bg-red-800"}
          />
        </div>
      </div>
    </div>
  );
};

export default DropZone;
