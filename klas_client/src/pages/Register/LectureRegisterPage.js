import React, { useState } from "react";
import axios from "axios";

function LectureRegisterPage() {
  // 체크된 아이템을 담을 배열
  const [lectureName, setLecturename] = useState("");
  const [professorName, setProfessorName] = useState("");
  const [output, setOutput] = useState("");

  const onchangeSubject = (e) => {
    // 과목입력함수
    setLecturename(e.target.value);
  };
  const onchangeProfessorName = (e) => {
    //교수이름 입력함수
    setProfessorName(e.target.value);
  };
  const registerSubmit = async (e) => {
    e.preventDefault(); // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    await axios
      .post("http://localhost:8080/lecture/register", { "lectureid": "1", "user" : {"userId" : "2018202076" }, "lectureDTO" : { "id" : "1"}})
      .then((res) => {
        res.status == "416"
          ? setOutput("수강인원 초과입니다.")
          : res.status == "200"
          ? setOutput("수강신청 되었습니다.")
          : setOutput("Server error"); //수강 정원을 초과했다면 받는 응답, 416 Requested Range Not Satisfiable
      });
  };
  const handleSubmit = async (e) => {
    //로컬서버에 검색 인덱스 전달하는 함수
    // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    // console.log(checkItems[0]);
    // console.log(lectureName);
    // console.log(professorName);

    e.preventDefault(); // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌

    if (lectureName === "" && professorName === "") {
      axios
        .get("http://localhost:8080/lecture/list", {})
        .then((res) => {
          console.log(res);
          setOutput(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      axios
        .post("http://localhost:8080/lecture/list", {
          lecturename: lectureName,
          professor: professorName,
        })
        .then((res) => {
          console.log(res);
          setOutput(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
      const emptyarray = [];
      setOutput(emptyarray);
    }
  };

  const listitem = (lecturelist) => {
    const result = [];
    for (let i = 0; i < lecturelist.length; i++) {
      result.push(
        <button class="flex flex-row justify-center w-full ">
          <div className="border border-black w-full">
            {lecturelist[i].lecturename}
          </div>

          <div className="border border-black w-full">
            {lecturelist[i].credit}/{lecturelist[i].time}
          </div>

          <div className="border border-black w-full">
            {lecturelist[i].professor}
          </div>

          <div className="border border-black w-full">
            <form onSubmit={registerSubmit}>
              <input
                value="수강신청"
                type="submit"
                className="border border-black cursor-pointer "
              />
            </form>
          </div>
        </button>
      );
    }
    return result;
  };

  return (
    <div class="flex flex-col justify-center items-center h-screen border bg-gradient-to-b from-white to-[#C8D6E8]">
      <div class="flex justify-center flex-col items-center h-[600px] w-[1400px] border border-black ">
        <div class="flex justify-start  w-[90%] h-[10%] mt-4">강의 조회</div>

        <form
          onSubmit={handleSubmit}
          class="flex flex-row justify-center w-[90%] h-[10%]  mt-4 mb-4"
        >
          <div class="flex flex-col ">
            <div class="flex flex-row  ">
              <div class=" border border-black w-full h-[30px]">
                과목명&nbsp;&nbsp;&nbsp;
              </div>
              <input
                class=" border border-black"
                type="text"
                onChange={onchangeSubject}
                placeholder="과목명을 입력하세요."
              />
            </div>
            <div class="flex flex-row">
              <div class="border border-black w-full h-[30px]">담당교수</div>
              <input
                class=" border border-black"
                type="text"
                onChange={onchangeProfessorName}
                placeholder="담당교수를 입력하세요."
              />
            </div>
          </div>

          <input
            value="조회"
            type="submit"
            className="border border-black w-[50px] h-[30px] cursor-pointer ml-[15px] mt-[15px]"
          />
        </form>

        <div class="flex flex-row justify-center border w-[90%] border-black ">
          <div class="border border-black w-full ">과목명</div>

          <div class="border border-black w-full ">학점/시간</div>

          <div class="border border-black w-full ">교수명</div>

          <div class="border border-black w-full ">수강신청</div>
        </div>

        {output.length === 0 ? (
          <div class="flex flex-row justify-center w-[90%] h-[60%] border border-black  ">
            검색결과가 없습니다.
          </div>
        ) : (
          <div class="flex flex-col  w-[90%] h-[60%] border border-black     ">
            <div class="overflow-y-auto w-full">{listitem(output)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LectureRegisterPage;
