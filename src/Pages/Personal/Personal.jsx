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
import Modal from "../../components/Modal/Modal";

const Personal = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  console.log(user.role);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleOnClose = () => setShowEditModal(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const navigateTo = () => {
    navigate("/add-course");
  };

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

  const DropDownMenu = [
    {
      title: "Form",
      Icon: <FaWpforms />,
      clickHander: navigateTo,
    },
    {
      title: "CSV",
      Icon: <BsFiletypeCsv />,

      clickHander: () => setShowEditModal(true),
    },
  ];

  return (
    <>
      <Layout heading={"Courses"}>
        <div className="mr-4 mt-2 flex  justify-end  z-100">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex flex-row p-3 rounded-xl gap-2 text-white font-semibold bg-blue-700 "
          >
            Add Course {<AiOutlinePlus className="mt-1" />}
          </button>
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
          children={<DropZone className="z-100" />}
          ModalHeading={"Uplaod Your CSV file"}
        />

        <div>
          <Table title={title} tableData={courses} />
        </div>
      </Layout>
    </>
  );
};

export default Personal;
