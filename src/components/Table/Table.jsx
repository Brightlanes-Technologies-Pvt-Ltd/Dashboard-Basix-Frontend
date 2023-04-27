import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { RiEditBoxLine } from "react-icons/ri";
import Modal from "../Modal/Modal";
import ClassForm from "../Form/ClassForm";
import DropZone from "../Form/DropZone";
import DeleteModal from "../Modal/DeleteModal";

const Table = ({ title, tableData, data }) => {
  const navigate = useNavigate();
  const [deleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCSVModal, setShowCSVModal] = useState(false);
  const handleOnClose = () => setShowEditModal(false);
  const handleOnCloseCSV = () => setShowCSVModal(false);
  const handleOnCloseDelete = () => setShowDeleteModal(false);

  const [topicTitle, setTitle] = useState([
    "course name",
    "start date",
    "end date",
    "enrolled students",
    "status",
    "action",
  ]);

  return (
    <div className="p-5 max-h-full bg-gray-100 ">
      <table className="w-full shadow-lg">
        <thead
          className="bg-gray-50 border-b-2 border-gray
          "
        >
          <tr>
            {topicTitle &&
              topicTitle.map((thead, index) => {
                return (
                  <th className="p-3 bg-white text-sm font-semibold tracking-wide uppercase ">
                    {thead}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody className="text-base  tracking-wide text-slate-700 ">
          {tableData &&
            tableData.map((td, index) => {
              return (
                <tr
                  className={
                    index % 2 === 0
                      ? "bg-blue-50 hover:text-blue-700 hover:text-lg hover:ring rounded-lg ring-offset-blue-200"
                      : "bg-white  hover:text-blue-700 hover:text-lg hover:ring rounded-lg ring-offset-blue-200"
                  }
                  key={td._id}
                >
                  <th
                    className="cursor-pointer  p-3 text-sm font-semibold tracking-wide "
                    onClick={() => navigate(`/course/${td._id}`)}
                  >
                    {td.courseName}
                  </th>
                  {/* <th className=" cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                    {td.description}
                  </th> */}
                  <th className="   cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                    {td.startDate.split("T")[0]}
                  </th>
                  <th className="   cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                    {td.endDate.split("T")[0]}
                  </th>
                  <th className=" cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                    {td.enrolledStudents}
                  </th>
                  <th className="  cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                    <div className="px-3 py-1.5 text-xs font-medium  tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                      {td.status}
                    </div>
                  </th>

                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide  flex justify-center ">
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
                  <Modal onClose={handleOnCloseDelete} visible={deleteModal}>
                    <DeleteModal />
                  </Modal>
                  <Modal
                    onClose={handleOnCloseCSV}
                    visible={showCSVModal}
                    ModalHeading={"Uplaod Your CSV file"}
                  >
                    <DropZone handleOnCloseCSV={handleOnCloseCSV} />
                  </Modal>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
