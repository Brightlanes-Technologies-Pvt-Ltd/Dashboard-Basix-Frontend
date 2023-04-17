const Table = ({ title, tableData }) => {
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
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    {thead}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((td, index) => {
              return (
                <tr
                  key={td._id}

                >
                  <th>
                    {td.courseName}
                  </th>
                  <th>
                    {td.description}
                  </th>
                  <th>
                    {td.startDate.split('T')[0]}
                  </th>
                  <th>
                    {td.endDate.split('T')[0]}
                  </th>
                  <th>
                    {td.enrolledStudents}
                  </th>
                  <th>
                    {td.status}
                  </th>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
