
const Table = (Title, TableData) => {
  const title = ["personal", "Activity", "Transactions"];
  const tableData = [
    { name: "form", email: "bgoyal@gmail.com", phone: "7973342798" },
    { name: "form", email: "bgoyal@gmail.com", phone: "7973342798" },
    { name: "form", email: "bgoyal@gmail.com", phone: "7973342798" },
    { name: "form", email: "bgoyal@gmail.com", phone: "7973342798" },
    { name: "form", email: "bgoyal@gmail.com", phone: "7973342798" },
    { name: "form", email: "bgoyal@gmail.com", phone: "7973342798" },
    { name: "form", email: "bgoyal@gmail.com", phone: "7973342798" },
    { name: "form", email: "bgoyal@gmail.com", phone: "7973342798" },
  ];

  return (
    <div className="p-5 max-h-full bg-gray-100">
      <table className="w-full">
        <thead
          className="bg-gray-50 border-b-2 border-gray
        "
        >
          <tr>
            {title.map((thead, index) => {
              return (
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  {thead}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tableData.map((td, index) => {
            return (
              <tr
                key={td.id}
                className={index % 2 === 0 ? "bg-cyan-50" : "bg-white"}
              >
                {Object.keys(td).map((data, index) => {
                  console.log(data);
                  return (
                    <td className="p-3 text-sm text-gray-700">{td[data]}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
