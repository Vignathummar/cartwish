import React from "react";

const Table = ({ headings, children }) => {
  return (
    <table className="w-2/3 m-auto  ml-auto border border-slate-400 mb-10">
      <thead className="bg-[#36304a] text-white">
        {headings.map((item, index) => (
          <th key={index} className="border border-slate-300 p-1">
            {item}
          </th>
        ))}
      </thead>
      {children}
    </table>
  );
};
export default Table;
