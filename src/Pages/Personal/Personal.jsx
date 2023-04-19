import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { read, utils } from "xlsx";
import Table from "../../components/Table/Table";
import { getClasses } from "../../utils/api/classApI/classApi";
import { setClass } from "../../redux/feateres/classSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { getAllCourses, getCourses } from "../../utils/api/course_API";
import { all } from "axios";
import Classes from "../../components/Classes";
import { useNavigate } from "react-router-dom";
import DropZone from "../../components/Form/DropZone";
import { AiOutlinePlus } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";

const Personal = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  console.log(user.role);
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState([
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

  const navigateTo = () => {
    navigate("/add-course");
  };

  const showModal = () => {
    setToggle({
      ...toggle,
      options: !toggle.options,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        if (user.role === "teacher") {
          const {
            data: { courses },
          } = await getCourses(user._id);
          setCourses([...courses]);
          // dispatch(setClass(allClass.data.classes));
        } else {
          const {
            data: { courses },
          } = await getAllCourses();
          setCourses([...courses]);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <Layout heading={"Courses"}>
        {/* <div className="mr-4 mt-2 flex  justify-end  z-10">
          <Button
            callback={showModal}
            text={"Add Course"}
            Icon={<AiOutlinePlus className="mt-1" />}
            className="flex flex-row p-3 rounded-xl gap-2 text-white font-semibold "
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
          <div className="flex justify-center">
            <DropZone setToggle={setToggle} />
          </div>
        ) : (
          ""
        )} */}
        <div
          onClick={() =>
            setToggle({
              ...toggle,
              modal: !toggle.modal,
            })
          }
        >
          <Table title={title} tableData={courses} />
        </div>
      </Layout>
    </>
  );
};

export default Personal;
