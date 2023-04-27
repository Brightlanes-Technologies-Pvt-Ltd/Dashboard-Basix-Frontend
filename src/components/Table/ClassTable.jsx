import { useState } from "react";
import { AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import ClassForm from "../Form/ClassForm";
import DropZone from "../Form/DropZone";
import DeleteModal from "../Modal/DeleteModal";
import { FaWpforms } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";

const ClassTable = ({ title, tableData }) => {
  const [deleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClose = () => setShowEditModal(false);
  const handleOnCloseCSV = () => setShowCSVModal(false);
  const handleOnCloseDelete = () => setShowDeleteModal(false);
  const navigate = useNavigate();

  const [topicTitle, setTitle] = useState([
    "class",
    "description",
    "start date",
    "end date",
    "category",
    "agendas",
    "class hours",
    "status",
    "action",
  ]);

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
    <div className="p-5 max-h-full bg-gray-100">
      <div className="mr-5 mt-2 flex  justify-end  ">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex flex-row p-3 rounded-xl gap-2 text-white font-semibold bg-blue-700 "
        >
          Add Class {<AiOutlinePlus className="mt-1" />}
        </button>
      </div>
      <div className="flex flex-col items-end mr-6 rounded-md ">
        {isOpen && (
          <>
            {DropDownMenu.map((items, index) => {
              return (
                <div
                  className=" text-center  bg-white gap-x-1  shadow-lg p-2 w-32 border-r-2 "
                  onClick={items.clickHander}
                >
                  <p className="   hover:bg-sky-100 hover:shadow-sm rounded-md justify-center gap-x-2 text-sm  flex  font-medium text-blue-900  py-2 ">
                    {items.title}
                    {items.Icon}
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
      <table className="w-full shadow-lg mt-3">
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
        <tbody className="text-base  tracking-wide text-slate-700">
          {tableData &&
            tableData.map((td, index) => {
              return (
                <tr
                  className={
                    index % 2 === 0
                      ? "bg-blue-50 hover:text-blue-700 "
                      : "bg-white  hover:text-blue-700 "
                  }
                  key={td._id}
                >
                  <th
                    onClick={() => {
                      navigate(`/description/${td._id}`);
                    }}
                    className="cursor-pointer  p-3 text-sm font-semibold tracking-wide hover:ring rounded-lg ring-offset-blue-200 "
                  >
                    {td.className}
                  </th>
                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide  ">
                    {td.description}
                  </th>
                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide  ">
                    {td.startDate.split("T")[0]}
                  </th>
                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide  ">
                    {td.endDate.split("T")[0]}
                  </th>
                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide  ">
                    {td.category}
                  </th>
                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide  ">
                    {td.agendas.length > 0
                      ? td.agendas.map((value) => <span>{value}</span>)
                      : "class"}
                  </th>

                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide  ">
                    {td.classHours}
                  </th>
                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide  ">
                 

                    {td.status ? (
                          <span class="px-3 py-1.5 text-xs font-medium  tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                            Active
                          </span>
                        ) : (
                          <span class="px-3 py-1.5 text-xs font-medium  tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50">
                            Not Active
                          </span>
                        )}
                  </th>

                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide   flex justify-center ">
                    <div className="flex flex-row gap-x-3  ">
                      <RiEditBoxLine
                        onClick={() => setShowEditModal(true)}
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

                  <Modal onClose={handleOnCloseDelete} visible={deleteModal}>
                    <DeleteModal />
                  </Modal>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ClassTable;
