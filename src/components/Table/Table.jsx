import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";

const Table = ({ title, tableData, data }) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-5 max-h-full bg-gray-100 ">
      <table className="w-full shadow-lg">
        <thead
          className="bg-gray-50 border-b-2 border-gray
          "
        >
          <tr>
            {title &&
              title.map((thead, index) => {
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
                  <th className=" cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                    {td.description}
                  </th>
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
                    {td.status}
                  </th>
                  {/* <th className=" cursor-pointer  p-3 text-sm font-semibold tracking-wide flex justify-end">
                    <SlOptionsVertical  />
                  </th> */}
                </tr>
              );
            })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;
