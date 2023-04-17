import { useState } from "react";
import Dropzone from "react-dropzone";
import React from "react";

import { useDispatch } from "react-redux";
import { updateClassFromCsv } from "../../redux/feateres/classSlice";
import { createClassesFromCSV } from "../../utils/api/classApI/classApi";

import { toast, ToastContainer } from "react-toastify";
import Button from "../Button/Button";
import { createCourseFromCSV } from "../../utils/api/course_API";

const DropZone = ({ setToggle, toggle, courseId = "" }) => {
  const [file, setFiles] = useState();
  const [fileName, setFileName] = useState("");
  const handleDropChange = (acceptedFiles) => {
    setFileName(acceptedFiles[0].path);

    setFiles(acceptedFiles[0]);
  };

  const dispatch = useDispatch();

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
    <div className="border px-3 py-1 w-2/3 h-44 fixed top-44 left-1/3 z-10 bg-gray-400 flex flex-col rounded">
      <ToastContainer />
      <div
        className="self-end"
        onClick={() => {
          setToggle({
            ...toggle,
            modal: false,
          });
        }}
      >
        X
      </div>
      <div className="self-center">
        <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              {fileName === "" ? (
                <div
                  {...getRootProps()}
                  className="dropzone upload-zone dz-clickable"
                >
                  <input {...getInputProps()} />

                  <div className="text-center">
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
      <div className="flex justify-between">
        <Button text={"Upload"} callback={uploadFromCsv} />
        <Button
          text={"Cancel"}
          callback={() => {
            setToggle({
              ...toggle,
              modal: false,
            });
          }}
        />
      </div>
    </div>
  );
};

export default DropZone;
