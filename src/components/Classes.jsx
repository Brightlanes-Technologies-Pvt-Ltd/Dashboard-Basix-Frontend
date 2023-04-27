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
import { FaChalkboardTeacher, FaWpforms } from "react-icons/fa";
import { BsFiletypeCsv, BsPersonBadgeFill } from "react-icons/bs";
import Card from "./common/Card/Card";
import { GiBlackBook } from "react-icons/gi";
import { MdOutlineDateRange } from "react-icons/md";
const Classes = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [classes, setClasses] = useState([]);
  const [course, setCourse] = useState({});
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

        setCourse({ ...course });
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

  const startDate = course.startDate && course.startDate.split("T")[0];

  return (
    <Layout heading={"classes"}>
      <div className="flex  items-center justify-between  mt-4 px-24 pt-4 pb-2">
        <div className="flex align-middle items-center shadow-xl  rounded-lg pl-6 pr-20 py-6 border-l-4 border-pink-400 bg-white justify-center  ">
          <div className="flex flex-row gap-x-3 ">
            <div className="flex justify-start">
              <GiBlackBook className="text-6xl bg-pink-400 fill-white  shadow-sm shadow-pink-900  rounded-full p-4" />
            </div>
            <div className="flex flex-col">
              <div className="  flex   justify-center align-middle items-start text-md font-semibold tracking-wide text-pink-700">
                Course
              </div>
              <div className="mt-1 flex justify-center text-gray-500 text-sm font-semibold">
                {course.courseName}
              </div>
            </div>
          </div>
        </div>
        <div className="flex align-middle items-center shadow-xl  rounded-lg pl-6 pr-20  py-6 border-l-4 border-purple-400  bg-white justify-center  ">
          <div className="flex flex-row gap-x-3 ">
            <div className="flex justify-start">
              <MdOutlineDateRange className="text-6xl bg-purple-400 fill-white  shadow-sm  shadow-purple-900  rounded-full p-4 " />
            </div>
            <div className="flex flex-col">
              <div className=" flex justify-center align-middle   items-start text-md font-semibold tracking-wide text-purple-700">
                Start Date
              </div>
              <div className="mt-1 flex justify-center text-gray-500 text-sm font-semibold">
                {startDate}
              </div>
            </div>
          </div>
        </div>
        <div className="flex align-middle items-center shadow-xl  rounded-lg pl-6 pr-20 py-6 border-l-4 border-red-400 bg-white justify-center  ">
          <div className="flex flex-row gap-x-3 ">
            <div className="flex justify-start">
              <MdOutlineDateRange className="text-6xl bg-red-400 fill-white  shadow-sm shadow-red-900  rounded-full p-4 " />
            </div>
            <div className="flex flex-col">
              <div className=" flex justify-center align-middle   items-start text-md font-semibold tracking-wide text-red-700">
                End Date
              </div>
              <div className="mt-1 flex justify-center text-gray-500 text-sm font-semibold">
                {course.endDate && course.endDate.split("T")[0]}
              </div>
            </div>
          </div>
        </div>

        <div className="flex align-middle items-center shadow-xl rounded-lg  border-l-4 border-rose-400 pl-6 pr-20 py-6 bg-white justify-center  ">
          <div className="flex flex-row gap-x-3 ">
            <div className="flex justify-start">
              <BsPersonBadgeFill className="text-6xl bg-rose-400   fill-white  shadow-sm shadow-rose-900  rounded-full p-4 " />
            </div>
            <div className="flex flex-col">
              <div className=" flex  justify-center align-middle items-start text-md font-semibold tracking-wide text-rose-700">
                Students
              </div>
              <div className=" mt-1 flex justify-center text-gray-500 text-sm font-semibold">
                {course.enrolledStudents}
              </div>
            </div>
          </div>
        </div>
        <div className="flex align-middle items-center shadow-xl  rounded-lg pl-6 pr-20 py-6 border-l-4 border-green-400 bg-white justify-center  ">
          <div className="flex flex-row gap-x-3 ">
            <div className="flex justify-start">
              <FaChalkboardTeacher className="text-6xl bg-green-400   fill-white  shadow-sm shadow-green-900  rounded-full p-4" />
            </div>
            <div className="flex flex-col">
              <div className=" flex  justify-center align-middle items-start text-md font-semibold tracking-wide text-green-700">
                Classes
              </div>
              <div className="mt-1 flex justify-center text-gray-500 text-sm font-semibold">
                {classes.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 mr-2">
        <ClassTable title={classTitle} tableData={classes} />
      </div>
    </Layout>
  );
};

export default Classes;
