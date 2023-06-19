import React, { useEffect } from "react";

function MyPage() {
  const header = ["이름", "학번", "비밀번호"];
  const data = ["이연걸", "2018202076", "********"];
  useEffect(() => {}, []);
  return (
    <div className="flex flex-col justify-start items-center  h-screen bg-gradient-to-b from-white to-[#C8D6E8] ">
      <div className="flex flex-row mt-[3%] w-[60%]">
        <div className="flex justify-start text-[20px]">MyPage</div>
      </div>
      <table
        className="border-collapse border rounded-lg shadow-md h-[15%] w-[60%] bg-white"
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
          {data.map((cell, cellIndex) => (
            <td key={cellIndex} className="border  text-center text-gray-700">
              {cell}
            </td>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyPage;
