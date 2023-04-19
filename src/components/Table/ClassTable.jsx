import { useNavigate } from "react-router-dom";

const ClassTable = ({ title, tableData }) => {
  const navigate = useNavigate();
  return (
    <div className="p-5 max-h-full bg-gray-100">
      <table className="w-full shadow-lg">
        <thead
          className="bg-gray-50 border-b-2 border-gray
          "
        >
          <tr>
            {title &&
              title.map((thead, index) => {
                return (
                  <th className="p-3 text-sm font-semibold tracking-wide uppercase">
                    {thead}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody className="ext-base  tracking-wide text-slate-700">
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
                  onClick={() => {
                    navigate(`/description/${td._id}`);
                  }}
                >
                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                    {td.className}
                  </th>
                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                    {td.description}
                  </th>
                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                    {td.startDate.split("T")[0]}
                  </th>
                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                    {td.endDate.split("T")[0]}
                  </th>
                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                    {td.category}
                  </th>
                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                    {td.agendas.length > 0
                      ? td.agendas.map((value) => <span>{value}</span>)
                      : "class"}
                  </th>

                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide ">{td.classHours}</th>
                  <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide ">{td.status}</th>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ClassTable;
