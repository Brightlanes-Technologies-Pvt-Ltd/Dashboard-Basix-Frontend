import React, { useState, useEffect } from "react";
import Layout from "./Layout/Layout";
import ClassTable from "./Table/ClassTable";
import { useAsyncValue, useNavigate, useParams } from "react-router-dom";
import { getAllClassesOfAcourse } from "../utils/api/classApI/classApi";
import { getACoursesById } from "../utils/api/course_API";
import Table from "./Table/Table";
import DropZone from "./Form/DropZone";
import Button from "./Button/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";

const Classes = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [classes, setClasses] = useState([]);
  const [course, setCourse] = useState([]);
  const [classTitle, setTitle] = useState([
    "className",
    "description",
    "startDate",
    "endDate",
    "category",
    "agendas",

    "classHours",
    "status",
  ]);
  const [courseTitle, setCourseTitle] = useState([
    "courseName",
    "description",
    "startDate",
    "endDate",
    "enrolledStudents",
    "status",
  ]);
  const [toggle, setToggle] = useState({
    options: false,
    modal: false,
  });
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { classes },
        } = await getAllClassesOfAcourse(courseId);

        setClasses([...classes]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { course },
        } = await getACoursesById(courseId);

        setCourse([{ ...course }]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const showModal = () => {
    setToggle({
      ...toggle,
      options: !toggle.options,
    });
  };

  const navigateTo = () => {
    navigate("/add-course");
  };

  return (
    <Layout
      heading={"classes"}
     
    >
      <div className="mr-4 flex  justify-end  z-10">
        <Button
          callback={showModal}
          text={"Add Classes"}
          Icon={<AiOutlinePlus className="mt-1" />}
          className="flex flex-row p-3 rounded-xl gap-2 text-white font-semibold"
        />
      </div>
      <div className="w-36  justify-center  fixed  right-5 z-10 ">
        {toggle.options ? (
          <div className=" text-center rounded-md bg-white gap-x-1  shadow-lg p-2">
            <p
              className="  border-b hover:bg-sky-100 hover:shadow-sm rounded-md justify-center gap-x-2 text-sm  flex  font-medium text-blue-900  py-2"
              onClick={navigateTo}
            >
              Form <FaWpforms />
            </p>
            <p
              className=" hover:bg-sky-100 hover:shadow-sm rounded-md justify-center gap-x-3 text-sm  flex  font-medium text-blue-900  py-2 "
              onClick={() => {
                setToggle({
                  ...toggle,
                  modal: !toggle.modal,
                });
              }}
            >
              CSV <BsFiletypeCsv />
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
      {toggle.modal ? (
        <div>
          <DropZone setToggle={setToggle} />
        </div>
      ) : (
        ""
      )}
      <div
        onClick={() =>
          setToggle({
            ...toggle,
            modal: !toggle.modal,
          })
        }
      ></div>

      <div className="flex flex-col gap-5">
        <Table title={courseTitle} tableData={course} />
        <ClassTable title={classTitle} tableData={classes} />
      </div>
    </Layout>
  );
};

export default Classes;
