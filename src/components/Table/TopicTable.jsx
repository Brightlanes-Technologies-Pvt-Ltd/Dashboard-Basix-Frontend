import React, { useEffect, useState } from "react";

import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlinePlus,
} from "react-icons/ai";
import { FaWpforms } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import { RiEditBoxLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import {
  createTopic,
  getAllTopicsOfAClass,
  updateTopic,
} from "../../utils/api/classApI/topicAPI";
import Layout from "../Layout/Layout";
import Modal from "../Modal/Modal";

import ClassForm from "../Form/ClassForm";
import DropZone from "../Form/DropZone";
import { MdOutlineDeleteOutline } from "react-icons/md";
import AgendaForm from "../Form/AgendaForm";
import { ToastContainer, toast } from "react-toastify";
import DeleteModal from "../Modal/DeleteModal";

const TopicTable = () => {
  const { classId } = useParams();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [showAgendaModal, setShowAgendaModal] = useState(false);
  const [deleteModal, setShowDeleteModal] = useState(false);

  const [topicID, setTopicID] = useState();

  const handleOnClose = () => setShowEditModal(false);
  const handleOnCloseCSV = () => setShowCSVModal(false);
  const handleOnCloseAgendaForm = () => setShowAgendaModal(false);
  const handleOnCloseDelete = () => setShowDeleteModal(false);

  const [isOpen, setIsOpen] = useState(false);
  const [topicData, setTopicData] = useState([]);
  const [topicTitle, setTitle] = useState([
    "description",
    "startDate",
    "endDate",
    "No.of Hours",
    "completed",
    "aws",
    "material Distributed",
    "test",
    "mentorship",
    "Action",
  ]);
  const addNewTopic = () => {
    setTopicID(null);
    setShowAgendaModal(true);
  };
  const DropDownMenu = [
    {
      title: "Form",
      Icon: <FaWpforms />,
      clickHander: addNewTopic,
    },
    {
      title: "CSV",
      Icon: <BsFiletypeCsv />,

      clickHander: () => setShowCSVModal(true),
    },
  ];

  const changeAgenda = (e) => {
    setTopicData({ ...topicData, [e.target.name]: !topicData.e.target.name });
  };

  const editTopic = (id) => {
    setTopicID(id);
    setShowAgendaModal(true);
  };

  const createAgendaTopic = async (topicData) => {
    try {
      const { data } = await createTopic(topicData, classId);
      toast.success(data.message, { autoClose: 1000 });
      handleOnCloseAgendaForm();
      getTopic();
    } catch (error) {
      console.log(error);
    }
  };

  const getTopic = async () => {
    try {
      const { data } = await getAllTopicsOfAClass(classId);

      setTopicData([...data.topics]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTopic();
  }, []);

  const updateAgenda = async (topicId, topicData) => {
    try {
      const { data } = await updateTopic(topicData, topicId);
      toast.success(data.message, { autoClose: 1000 });
      handleOnCloseAgendaForm();
      getTopic();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Layout heading={"Topics"}>
        <div className="mr-4 mt-2 flex  justify-end  z-100">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex flex-row p-3 rounded-xl gap-2 text-white font-semibold bg-blue-700 "
          >
            Add Topic {<AiOutlinePlus className="mt-1" />}
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

        <div className="flex flex-col gap-5 p-8 text-sm font-semibold tracking-wide text-slate-700  ">
          <table className="w-full shadow-lg">
            <thead
              className="bg-gray-50 border-b-2 border-gray 
          "
            >
              <tr>
                {topicTitle &&
                  topicTitle.map((thead, index) => {
                    return (
                      <th className="p-3 text-sm font-semibold tracking-wide uppercase">
                        {thead}
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody>
              {topicData &&
                topicData.map((td, index) => {
                  return (
                    <tr
                      className={index % 2 === 0 ? "bg-blue-50 " : "bg-white "}
                      key={td._id}
                    >
                      <th className="p-3 text-sm font-semibold tracking-wide hover:text-blue-700  hover:ring rounded-lg ring-offset-blue-200">
                        {td.description}
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide hover:text-blue-700  hover:ring rounded-lg ring-offset-blue-200">
                        {td.startDate && td.startDate.split("T")[0]}
                      </th>
                      <th className="p-3 text-sm font-semibold tracking-wide hover:text-blue-700  hover:ring rounded-lg ring-offset-blue-200">
                        {td.endDate && td.endDate.split("T")[0]}
                      </th>

                      <th>{td.topicHours}</th>

                      <th className="  cursor-pointer  p-3 text-sm font-semibold tracking-wide hover:text-blue-700  hover:ring rounded-lg ring-offset-blue-200  ">
                        {td.completed ? (
                          <span class="px-3 py-1.5 text-xs font-medium  tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                            Done
                          </span>
                        ) : (
                          <span class="px-3 py-1.5 text-xs font-medium  tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50">
                            Pending
                          </span>
                        )}
                      </th>
                      <th className="  cursor-pointer  p-3 text-sm font-semibold tracking-wide hover:text-blue-700  hover:ring rounded-lg ring-offset-blue-200 ">
                        {td.aws ? (
                          <span class="px-3 py-1.5 text-xs font-medium  tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                            Done
                          </span>
                        ) : (
                          <span class="px-3 py-1.5 text-xs font-medium  tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50">
                            Pending
                          </span>
                        )}
                      </th>
                      <th className="  cursor-pointer  p-3 text-sm font-semibold tracking-wide hover:text-blue-700  hover:ring rounded-lg ring-offset-blue-200 ">
                        {" "}
                        {td.materialDistributed ? (
                          <span class="px-3 py-1.5 text-xs font-medium  tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                            Done
                          </span>
                        ) : (
                          <span class="px-3 py-1.5 text-xs font-medium  tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50">
                            Pending
                          </span>
                        )}
                      </th>
                      <th className="  cursor-pointer  p-3 text-sm font-semibold tracking-wide hover:text-blue-700  hover:ring rounded-lg ring-offset-blue-200 ">
                        {td.test ? (
                          <span class="px-3 py-1.5 text-xs font-medium  tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                            Done
                          </span>
                        ) : (
                          <span class="px-3 py-1.5 text-xs font-medium  tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50">
                            Pending
                          </span>
                        )}
                      </th>
                      <th className="  cursor-pointer  p-3 text-sm font-semibold tracking-wide hover:text-blue-700  hover:ring rounded-lg ring-offset-blue-200 ">
                        {td.mentorship ? (
                          <span class="px-3 py-1.5 text-xs font-medium  tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                            Done
                          </span>
                        ) : (
                          <span class="px-3 py-1.5 text-xs font-medium  tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50">
                            Pending
                          </span>
                        )}
                      </th>

                      <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide  flex justify-center ">
                        <div className="flex flex-row gap-x-3  ">
                          <RiEditBoxLine
                            onClick={() => {
                              editTopic(td._id);
                            }}
                            className="text-lg hover:text-2xl fill-blue-700"
                          />

                          <MdOutlineDeleteOutline
                            onClick={() => setShowDeleteModal(true)}
                            className="text-lg hover:text-2xl fill-blue-700"
                          />
                        </div>
                      </th>
                      <Modal
                        onClose={handleOnClose}
                        visible={showEditModal}
                        children={<ClassForm />}
                        ModalHeading={"Add a new class"}
                      />
                      <Modal
                        onClose={handleOnCloseCSV}
                        visible={showCSVModal}
                        ModalHeading={"Uplaod Your CSV file"}
                      >
                        <DropZone handleOnCloseCSV={handleOnClose} />
                      </Modal>

                      <Modal
                        onClose={handleOnCloseDelete}
                        visible={deleteModal}
                      >
                        <DeleteModal />
                      </Modal>

                      <Modal
                        onClose={handleOnCloseAgendaForm}
                        visible={showAgendaModal}
                        ModalHeading={"Update Your Agendas"}
                      >
                        <AgendaForm
                          topicId={topicID}
                          handleOnCloseAgendaForm={handleOnCloseAgendaForm}
                          updateAgenda={updateAgenda}
                          createAgendaTopic={createAgendaTopic}
                        />
                      </Modal>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default TopicTable;
