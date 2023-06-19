import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Table from "../../components/Table";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function StudentAttendancePage() {
  const header = ["주차", "1", "2"];
  const { userId } = useContext(UserContext);
  const [attendance, setAttendance] = useState([]);
  const [data, setData] = useState([
    {
      lectureName: "웹프로그래밍",
      attendance: [
        ["O", "X"],
        ["O", "O"],
        ["O", "O"],
        ["X", "O"],
        ["O", "O"],
        ["O", "X"],
        ["O", "X"],
        ["O", "X"],
        ["O", "X"],
        ["O", "O"],
        ["O", "O"],
        ["O", "O"],
        ["X", "X"],
        ["O", "X"],
        ["O", "X"],
      ],
    },
    {
      lectureName: "고급프로그래밍",
      attendance: [
        ["O", "X"],
        ["O", "X"],
        ["O", "X"],
        ["X", "X"],
        ["O", "O"],
        ["O", "O"],
        ["O", "O"],
        ["O", "X"],
        ["X", "X"],
        ["O", "X"],
        ["O", "X"],
        ["O", "O"],
        ["O", "O"],
        ["X", "O"],
        ["O", "O"],
      ],
    },
    {
      lectureName: "시스템프로그래밍",
      attendance: [
        ["O", "X"],
        ["O", "X"],
        ["O", "X"],
        ["X", "X"],
        ["O", "O"],
        ["O", "O"],
        ["X", "O"],
        ["O", "X"],
        ["O", "X"],
        ["X", "X"],
        ["O", "X"],
        ["O", "O"],
        ["X", "O"],
        ["O", "O"],
        ["X", "O"],
      ],
    },
    {
      lectureName: "알고리즘",
      attendance: [
        ["O", "X"],
        ["O", "X"],
        ["X", "X"],
        ["O", "X"],
        ["X", "O"],
        ["O", "X"],
        ["X", "O"],
        ["O", "X"],
        ["O", "X"],
        ["X", "X"],
        ["O", "X"],
        ["O", "O"],
        ["X", "O"],
        ["O", "X"],
        ["O", "O"],
      ],
    },
  ]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/attendance", {
        user: { userId: userId },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const handleAttendance = (e) => {
    console.log(e.target.value);
    const targetObject = data.find(
      (item) => item.lectureName === e.target.value
    );
    const targetList = targetObject.attendance;
    // 주차 정보 배열 생성
    const weeks = Array.from(
      { length: targetList.length },
      (_, index) => `${index + 1}주차`
    );
    // 1열에 주차 정보 추가
    const result = targetList.map((row, index) => [weeks[index], ...row]);
    setAttendance(result);
  };
  return (
    <div className="flex flex-col justify-start items-center  h-screen bg-gradient-to-b from-white to-[#C8D6E8] ">
      <div className="flex flex-col justify-evenly items-center h-[80%] w-[60%]">
        <div className="flex text-[25px] mt-[3%] w-[100%] h-[5%] border-[2px] items-center bg-white rounded-[10px]">
          <div className="ml-4">출석체크 조회</div>
        </div>
        <select
          className="border-[2px] w-full"
          name="lecture"
          onChange={handleAttendance}
        >
          <option value="">강의를 선택해주세요</option>
          {data.map((lecture) => (
            <option value={lecture.lectureName}>{lecture.lectureName}</option>
          ))}
        </select>
        <div className="inline-block h-[80%] ">
          <Table header={header} data={attendance} />
        </div>
      </div>
    </div>
  );
}
export default StudentAttendancePage;
