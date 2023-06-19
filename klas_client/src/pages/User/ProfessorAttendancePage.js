import React from "react";
import Table from "../../components/Table";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";

function ProfessorAttendancePage() {
  const header = ["주차", "1", "2"];
  const [student, setStudent] = useState();
  const [lecture, setLecture] = useState();

  const [data, setData] = useState([
    [1, 0, 0],
    [2, 0, 0],
    [3, 0, 0],
    [4, 0, 0],
    [5, 0, 0],
    [6, 0, 0],
    [7, 0, 0],
    [8, 0, 0],
    [9, 0, 0],
    [10, 0, 0],
    [11, 0, 0],
    [12, 0, 0],
    [13, 0, 0],
    [14, 0, 0],
    [15, 0, 0],
  ]);

  const handleAttendance = () => {
    axios
      .post("http://localhost:8080/attendance", {
        lectureName: lecture,
        studentName: student,
        attendance: data,
      })
      .then((res) => {
        console.log(res.data);
        alert("출석체크에 성공하였습니다.");
      })
      .catch((err) => {
        console.log(err.response);
        alert("출석체크에 실패하였습니다.");
      });

    const foundObj = data.find((obj) => {
      return obj.studentName === student && obj.lectureName === lecture;
    });
  };
  return (
    <div className="flex flex-col justify-start items-center  h-screen bg-gradient-to-b from-white to-[#C8D6E8] ">
      <div className="flex flex-col justify-evenly items-center h-[80%] w-[60%]">
        <div className="flex text-[25px] mt-[3%] w-[100%] h-[5%] border-[2px] items-center bg-white rounded-[10px]">
          <div className="ml-4">출석체크 입력</div>
        </div>
        <div className="flex  w-full pl-4 justify-start ">
          <Input
            type="text"
            onChange={setLecture}
            placeholder="강의명을 입력해주세요"
          />
          <Input
            type="text"
            onChange={setStudent}
            placeholder="학생명을 입력해주세요"
          />
        </div>

        <div className="inline-block h-[80%] ">
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
                    <td
                      key={cellIndex}
                      className="border  text-center text-gray-700"
                    >
                      {cellIndex === 0 ? (
                        <div>{rowIndex + 1}</div>
                      ) : (
                        <div>
                          <label>결석</label>
                          <input
                            name={`${rowIndex}${cellIndex}`}
                            type="radio"
                            value="option1"
                            onClick={() => {
                              const tmpData = data;
                              console.log(tmpData);
                              tmpData[rowIndex][cellIndex] = 0;
                              setData(tmpData);
                            }}
                          />
                          <label>출석</label>
                          <input
                            name={`${rowIndex}${cellIndex}`}
                            value="option2"
                            type="radio"
                            onClick={() => {
                              const tmpData = data;
                              console.log(tmpData);
                              tmpData[rowIndex][cellIndex] = 1;
                              setData(tmpData);
                            }}
                          />
                          <label>지각</label>
                          <input
                            name={`${rowIndex}${cellIndex}`}
                            value="option3"
                            type="radio"
                            onClick={() => {
                              const tmpData = data;
                              console.log(tmpData);
                              tmpData[rowIndex][cellIndex] = 2;
                              setData(tmpData);
                            }}
                          />
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex w-full justify-end pr-4">
          <Button text={"선택 완료"} onClick={handleAttendance} />
        </div>
      </div>
    </div>
  );
}

export default ProfessorAttendancePage;
