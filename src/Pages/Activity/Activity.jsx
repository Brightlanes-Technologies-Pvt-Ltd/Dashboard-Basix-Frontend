import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Table from "../../components/Table/Table";

import { useSelector } from "react-redux";
import { getAllCourses, getCourses } from "../../utils/api/course_API";
import DropZone from "../../components/Form/DropZone";
import { AiOutlinePlus } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import Modal from "../../components/Modal/Modal";
import ClassForm from "../../components/Form/ClassForm";
import Tabs from "../../components/common/Tabs/Tabs";

const Activity = () => {
  const { user } = useSelector((state) => state.user);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCSVModal, setShowCSVModal] = useState(false);
  const handleOnClose = () => setShowEditModal(false);
  const handleOnCloseCSV = () => setShowCSVModal(false);

  const [isOpen, setIsOpen] = useState(false);

  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState([
    "courseName",
    "description",
    "startDate",
    "endDate",
    "enrolledStudents",
    "status",
  ]);

  useEffect(() => {
    (async () => {
      try {
        if (user.role === "teacher") {
          const {
            data: { courses },
          } = await getCourses(user._id);
          setCourses([...courses]);
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

  const DropDownMenu = [
    {
      title: "Form",
      Icon: <FaWpforms />,
      clickHander: () => setShowEditModal(true),
    },
    {
      title: "CSV",
      Icon: <BsFiletypeCsv />,

      clickHander: () => setShowCSVModal(true),
    },
  ];

  return (
    <>
      <Layout heading={"Courses"}>
        <Tabs />
        <div className="mr-4 mt-2 flex  justify-end  ">
          {user.role === "Admin" ? (
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex flex-row p-3 rounded-xl gap-2 text-white font-semibold bg-blue-700 "
            >
              Add Course {<AiOutlinePlus className="mt-1" />}
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col items-end mr-6 rounded-md ">
          {isOpen && (
            <>
              {DropDownMenu.map((items, index) => {
                return (
                  <div
                    className=" text-center  bg-white gap-x-1  shadow-lg p-2 w-32 border-r-2"
                    onClick={items.clickHander}
                  >
                    <p className="   hover:bg-sky-100 hover:shadow-sm rounded-md justify-center gap-x-2 text-sm  flex  font-medium text-blue-900  py-2">
                      {items.title}
                      {items.Icon}
                    </p>
                  </div>
                );
              })}
            </>
          )}
        </div>

        <Modal
          onClose={handleOnClose}
          visible={showEditModal}
          children={<ClassForm className=" flex px-10" />}
          ModalHeading={"Add a new class"}
        />
        <Modal
          onClose={handleOnCloseCSV}
          visible={showCSVModal}
          children={<DropZone />}
          ModalHeading={"Uplaod Your CSV file"}
        />

        <div>
          <Table title={title} tableData={courses} />
        </div>
      </Layout>
    </>
  );
};

export default Activity;
