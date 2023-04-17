import { useState } from "react";
import Dropzone from "react-dropzone";
import React from "react";
import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { updateClassFromCsv } from "../../../redux/feateres/classSlice";
import { createClassesFromCSV } from "../../../utils/api/classApI/classApi";
import { Icon } from "../../../components/Component";
import { toast, ToastContainer } from "react-toastify";

const DropZone = ({ toggleCsvForm }) => {
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
        const { data } = await createClassesFromCSV(file);
        console.log(data);
        dispatch(updateClassFromCsv(data.classes));
        toast.success("All Classes Uploaded Successfully", {
          autoClose: 1000,
        });

        setTimeout(() => {
          toggleCsvForm();
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("please provide a file");
    }
  };

  return (
    <>
      <ToastContainer />
      <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            {fileName === "" ? (
              <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                <input {...getInputProps()} />

                <div className="dz-message">
                  <span className="dz-message-text">Drag and drop file</span>
                  <span className="dz-message-or">or</span>
                  <Button color="primary">SELECT</Button>
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center flex-column bd-highlight mb-3 inverse " inverse color="primary">
                {" "}
                <span className="p-2 bd-highlight lead-text"> Click to Display Data on Calender </span>
                <span className="dz-message-text bd-highlight d-flex fst-italic mb-1 dz-message-or">
                  <p className="base-font-family fw-medium mx-1 fst-italic">Your Uploaded File : </p>
                  <u>{fileName}</u>
                </span>
                <Button onClick={uploadFromCsv} outline color="primary" className="mx-2 btn-round">
                  Upload Data
                </Button>
              </div>
            )}
          </section>
        )}
      </Dropzone>
    </>
  );
};

export default DropZone;
