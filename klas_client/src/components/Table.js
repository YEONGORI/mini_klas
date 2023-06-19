import React from "react";

function Table({ header, data }) {
  return (
    <table
      className="border-collapse border rounded-lg shadow-md h-full w-full bg-white"
      style={{ tableLayout: "fixed" }}
    >
      <thead>
        <tr>
          {header.map((text, index) => (
            <th
              key={index}
              className="border bg-gray-200  text-center font-medium text-gray-700"
            >
              {text}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="border  text-center text-gray-700">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
