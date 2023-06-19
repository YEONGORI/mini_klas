import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LectureAssignmentListPage() {
  //////////////////////////////////////////////////////////////////////////////////////////////
  /*변수명은 하드코딩인데 하드코딩 아님*/

  const [hardcodingSubject, setHardcodingSubject] = useState(
    JSON.parse(localStorage.subject)
  );
  const [hardcodingUserType, setHardcodingUserType] = useState(
    Number(localStorage.userType) - 1
  );
  const [hardcodingUserName, setHardcodingUserName] = useState(
    localStorage.name
  );
  const [hardcodingUserId, setHardcodingUserId] = useState(
    Number(localStorage.userId)
  );

  ///////////////////////////////////////////////////////////////////////////////
  const navigate = useNavigate();
  const [output, setOutput] = useState([]);

  const [currentSubject, setCurrentSubject] = useState("");

  const handleSubmit = (e) => {
    //조회 버튼을 눌른 경우 처리

    console.log(currentSubject);
    e.preventDefault();

    if (currentSubject === "") {
      return { ...alert("과목을 선택해주세요.") };
    } else {
      //백서버에서 강의자료 리스트 데이터 가져오기
      axios
        .post("http://localhost:8080/lecture/assignment/list", {
          lectureid: currentSubject,
          status: "공지",
        })
        .then((res) => {
          console.log(res);
          setOutput(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const handleSelect = (e) => {
    //현재 선택한 과목 usestate를 통해 저장
    setCurrentSubject(e.target.value);
  };

  const listitem = (lecturelist) => {
    // 백에서 가져온 리스트 데이터 출력함수
    const result = [];
    for (let i = 0; i < lecturelist.length; i++) {
      result.push(
        <button
          class="flex flex-row justify-center w-full "
          onClick={() => {
            navigate("/lecture/assignment/detail", {
              state: {
                id: lecturelist[i].id,
                assignmentid: lecturelist[i].assignmentid,
                lectureid: lecturelist[i].lectureid,
                title: lecturelist[i].title,
                content: lecturelist[i].content,
                attachmentname: lecturelist[i].attachmentname,
                attachmentaddress: lecturelist[i].attachmentaddress,
                deadline: lecturelist[i].deadline,
                status: lecturelist[i].status,
                userid: lecturelist[i].userid,
                author: lecturelist[i].author,
                date: lecturelist[i].date,

                hardcodingUserId: hardcodingUserId,
                hardcodingUserType: hardcodingUserType,
                hardcodingUserName: hardcodingUserName,
              },
            });
          }}
        >
          <div class="border border-black w-full">{i + 1}</div>
          <div class="border border-black w-full">{lecturelist[i].title}</div>
          <div class="border border-black w-full">{lecturelist[i].author}</div>
          <div class="border border-black w-full">
            {lecturelist[i].deadline}
          </div>
        </button>
      );
    }
    return result;
  };

  return (
    <div class="flex flex-col justify-center items-center h-screen border bg-gradient-to-b from-white to-[#C8D6E8]">
      <div class="flex justify-center flex-col items-center h-[600px] w-[1400px] border border-black">
        <div class="flex justify-start w-[90%] h-[10%] mt-4 text-[40px]">
          과제 제출
        </div>

        <form
          onSubmit={handleSubmit}
          class="flex flex-row justify-center w-[90%] h-[10%]  mt-4 mb-4"
        >
          <div class=" border border-black flex  items-center">
            과목명&nbsp;&nbsp;&nbsp;
          </div>

          <select
            class=" border border-black w-[200px] flex  items-center cursor-pointer "
            onChange={handleSelect}
            value={currentSubject}
          >
            <option value="" class="cursor-pointer">
              과목을 선택해주세요
            </option>
            {/* 학생이 수강하는 전체 과목명을 출력하는 option 태그 */}
            {
              //하드코딩 사용
              hardcodingSubject.map((item) => (
                <option value={item.lectureid} key={item.lectureid}>
                  {item.lecturename}
                </option>
              ))
            }
          </select>

          <input
            value="조회"
            type="submit"
            class="border border-black w-[50px] h-[30px] cursor-pointer ml-[15px] mt-[15px]"
          />
        </form>

        {
          //하드코딩 사용
          hardcodingUserType === 1 ? (
            <div class="flex justify-end w-[90%] mb-2">
              <button
                class="border border-black w-[100px] h-[30px] text-[15px] "
                onClick={() => {
                  if (currentSubject === "") {
                    return { ...alert("과목을 선택해주세요.") };
                  } else {
                    navigate("/lecture/assignment/write", {
                      state: {
                        name: hardcodingUserName,
                        lectureid: currentSubject,
                        userid: hardcodingUserId,
                        status: "공지",
                      },
                    });
                  }
                }}
              >
                과제 업로드
              </button>
            </div>
          ) : (
            <div></div>
          )
        }

        <div class="flex flex-row justify-center w-[90%]  border-black ">
          <div class="border border-black w-full">번호</div>
          <div class="border border-black w-full">제목</div>
          <div class="border border-black w-full">작성자</div>
          <div class="border border-black w-full">마감날짜</div>
        </div>

        {output.length === 0 ? (
          <div className="flex flex-row justify-center w-[90%] h-[48%] border border-black">
            검색결과가 없습니다.
          </div>
        ) : (
          <div className="flex flex-col  w-[90%] h-[48%] border border-black     ">
            {/* 검색결과 리스트를 출력하는 부분 */}
            <div class="overflow-y-auto w-full">{listitem(output)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
export default LectureAssignmentListPage;
