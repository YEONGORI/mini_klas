import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Chart from "../../components/Chart";

function StudentGradePage() {
  const [grades, setGrades] = useState([
    {
      semester: "2-1",
      grade: 4.1,
      table: [
        [
          "H020-4-3680-01",
          "소프트웨어프로젝트1",
          "컴퓨터정보공학부",
          "전선",
          "3",
          "B+",
        ],
        [
          "H020-3-8994-01",
          "컴퓨터구조실험",
          "컴퓨터정보공학부",
          "전선",
          "1",
          "A+",
        ],
        [
          "H020-4-3680-01",
          "컴퓨터구조실험",
          "컴퓨터정보공학부",
          "전선",
          "1",
          "A+",
        ],
      ],
    },
    {
      semester: "1-2",
      grade: 3.5,
      table: [
        [
          "H020-4-3680-01",
          "소프트웨어프로젝트1",
          "컴퓨터정보공학부",
          "전선",
          "3",
          "B+",
        ],
        [
          "H020-3-8994-01",
          "컴퓨터구조실험",
          "컴퓨터정보공학부",
          "전선",
          "1",
          "A+",
        ],
        [
          "H020-4-3680-01",
          "컴퓨터구조실험",
          "컴퓨터정보공학부",
          "전선",
          "1",
          "A+",
        ],
      ],
    },
    {
      semester: "1-1",
      grade: 4.5,
      table: [
        [
          "H020-4-3680-01",
          "소프트웨어프로젝트1",
          "컴퓨터정보공학부",
          "전선",
          "3",
          "B+",
        ],
        [
          "H020-3-8994-01",
          "컴퓨터구조실험",
          "컴퓨터정보공학부",
          "전선",
          "1",
          "A+",
        ],
        [
          "H020-4-3680-01",
          "컴퓨터구조실험",
          "컴퓨터정보공학부",
          "전선",
          "1",
          "A+",
        ],
      ],
    },
  ]);
  let data = [4.1, 3.5, 4.5];
  const { userId, userType } = useContext(UserContext);
  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/score",
        {
          userId: userId,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        data = [];
        console.log(res.data);
        setGrades(res.data);
        for (let i = 0; i < res.data.length; i++) {
          data.push(res.data[i].grade);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  let header = ["학정번호", "과목명", "개설학과", "이수구분", "학점", "성적"];
  return (
    <div class="flex flex-col justify-start items-center  h-screen bg-gradient-to-b from-white to-[#C8D6E8] overflow-y-auto">
      <div class="flex flex-row mt-[3%] border-collapse h-[100vh] w-[60%] overflow-y-auto ">
        <div className=" inline-block justify-evenly overflow-y-auto">
          <div className="flex justify-center items-center font-bold text-[20px]">
            평균 평점
          </div>
          <div className="flex justify-center h-[30%] w-full">
            <Chart data={data} />
          </div>
          {grades.map((grade) => (
            <div className="flex flex-col h-[40%] w-full justify-center items-center">
              <div className="pt-5">{grade.semester}</div>
              <Table header={header} data={grade.table} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentGradePage;
