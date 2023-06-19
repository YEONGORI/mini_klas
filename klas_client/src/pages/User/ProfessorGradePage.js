import React from "react";
import { useState } from "react";
import Button from "../../components/Button";
import axios from "axios";

function ProfessorGradePage() {
  const [semester, setSemester] = useState();
  const [studentId, setstudentId] = useState();
  const [grade, setGrade] = useState();
  const [lectureId, setLectureId] = useState();
  return (
    <div class="flex flex-col justify-start items-center  h-screen bg-gradient-to-b from-white to-[#C8D6E8] overflow-y-auto">
      <div class="flex flex-col mt-[3%] border-collapse justify-evenly items-evenly h-[80%] w-[60%] overflow-y-auto ">
        <div className="flex text-[25px] mt-[3%] w-full h-[10%] border-[2px] items-center bg-white rounded-[10px]">
          <div className="ml-4">성적 입력</div>
        </div>
        <div>학기를 입력하시오.</div>
        <input
          className="flex w-full h-[5%] "
          placeholder="학기"
          onChange={(e) => {
            setSemester(e.target.value);
          }}
        />
        <div>학생의 학번을 입력하시오.</div>
        <input
          className="flex w-full h-[5%] "
          placeholder="학생"
          onChange={(e) => {
            setstudentId(e.target.value);
          }}
        />
        <div>학생의 학점을 입력하시오.</div>
        <input
          className="flex w-full h-[5%] "
          placeholder="학점"
          onChange={(e) => {
            setGrade(e.target.value);
          }}
        />
        <div>강의의 학정번호를 입력하시오.</div>
        <input
          className="flex w-full h-[5%] "
          placeholder="강의"
          onChange={(e) => {
            setLectureId(e.target.value);
          }}
        />
        <Button
          text={"성적입력"}
          onClick={() => {
            axios
              .post("http://localhost:8080/score", {
                semester: semester,
                userId: studentId,
                grade: grade,
                lectureId: lectureId,
              })
              .then((res) => {
                console.log(res);
                alert("성적입력이 성공했습니다.");
              })
              .catch((err) => {
                console.log(err.response);
                alert("성적입력이 실패했습니다.");
              });
          }}
        />
      </div>
    </div>
  );
}

export default ProfessorGradePage;
