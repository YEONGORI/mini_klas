// import React, { useState } from "react";
// import axios from "axios";

// function LectureRegisterPage() {
//   const data = [
//     { id: 1, title: "전체" },
//     { id: 2, title: "수강과목" },
//   ];

//   // 체크된 아이템을 담을 배열
//   const [checkItems, setCheckItems] = useState([]);

//   const handleSingleCheck = (checked, id) => {
//     if (checked) {
//       // 단일 선택 시 체크된 아이템을 배열에 추가
//       setCheckItems((prev) => [...prev, id]);
//     } else {
//       // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
//       setCheckItems(checkItems.filter((el) => el !== id));
//     }
//   };

//   const [lectureName, setLecturename] = useState("");
//   const [professorName, setProfessorName] = useState("");

//   const onchangeSubject = (e) => {
//     // 과목입력함수
//     setLecturename(e.target.value);
//   };
//   const onchangeProfessorName = (e) => {
//     //교수이름 입력함수
//     setProfessorName(e.target.value);
//   };

//   const registerSubmit = async(e) => {
//     //로컬서버에 검색 인덱스 전달하는 함수
//     // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
//     console.log(checkItems[0]);
//     console.log(lectureName);
//     console.log(professorName);

//     await axios
//     .post("http://localhost:8080/lecture/register",{lectureid : 1,})
//     .then(res) => {

//     }

//     e.preventDefault();
//     if (checkItems.length === 0) {
//       return { ...alert("체크박스를 선택하세요") };
//     } else if (checkItems[0] === 1 && checkItems[1] === 2) {
//       return { ...alert("체크박스를 하나만 선택하세요") };
//     } else if (
//       checkItems[0] === 1 &&
//       lectureName === "" &&
//       professorName === ""
//     ) {
//       axios
//         .get("http://localhost:8080/lecture/list", {})
//         .then((res) => {
//           console.log(res);
//           setOutput(res.data);
//         })
//         .catch((err) => {
//           console.log(err.response);
//         });
//     } else {
//       axios
//         .post("http://localhost:8080/lecture/list", {
//           lecturename: lectureName,
//           professor: professorName,
//         })
//         .then((res) => {
//           console.log(res);
//           setOutput(res.data);
//         })
//         .catch((err) => {
//           console.log(err.response);
//         });
//       const emptyarray = [];
//       setOutput(emptyarray);
//     }
//   };
//   const [output, setOutput] = useState([]);
//   console.log(output); //디버깅
//   const listitem = (lecturelist) => {
//     const result = [];
//     for (let i = 0; i < lecturelist.length; i++) {
//       result.push(
//         <button class="flex flex-row justify-center " onClick={() => {}}>
//           <div class="border border-black w-full">
//             {lecturelist[i].lecturename}
//           </div>

//           <div class="border border-black w-full">
//             {lecturelist[i].credit}/{lecturelist[i].time}
//           </div>

//           <div class="border border-black w-full">
//             {lecturelist[i].professor}
//           </div>

//           <div class="border border-black w-full">{lecturelist[i].contact}</div>
//         </button>
//       );
//     }
//     return result;
//   };

//   return (
//     <div class="flex flex-col justify-center items-center h-screen border bg-gradient-to-b from-white to-[#C8D6E8]">
//       <div class="flex justify-center flex-col items-center h-[70%] w-[70%] ">
//         <div class="flex justify-start w-full  mb-4">강의계획서 조회</div>

//         <form
//           onSubmit={handleSubmit}
//           class="flex flex-row justify-center w-full  mb-4"
//         >
//           <div class="flex flex-col">
//             <div class="flex flex-row  ">
//               <div class=" border border-black w-full">
//                 과목명&nbsp;&nbsp;&nbsp;
//               </div>
//               <input
//                 class=" border border-black"
//                 type="text"
//                 onChange={onchangeSubject}
//                 placeholder="과목명을 입력하세요."
//               />
//             </div>
//             <div class="flex flex-row">
//               <div class="border border-black w-full">담당교수</div>
//               <input
//                 class=" border border-black"
//                 type="text"
//                 onChange={onchangeProfessorName}
//                 placeholder="담당교수를 입력하세요."
//               />
//             </div>
//           </div>
//           <div class="flex justify-center items-center border border-black ">
//             수강여부
//           </div>

//           <div class="flex justify-center itmes-center border border-black">
//             <div class="flex flex-row mt-[14px]">
//               {data?.map((data, key) => (
//                 <tr key={key}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       name={`select-${data.id}`}
//                       onChange={(e) =>
//                         handleSingleCheck(e.target.checked, data.id)
//                       }
//                       // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
//                       checked={checkItems.includes(data.id) ? true : false}
//                     />
//                   </td>
//                   <td className="second-row">{data.title}</td>
//                 </tr>
//               ))}
//             </div>
//           </div>

//           <input
//             value="조회"
//             type="submit"
//             className="border border-black w-[50px] h-[30px] cursor-pointer ml-[15px] mt-[15px]"
//           />
//         </form>

//         <div class="flex flex-col justify-center w-full   ">
//           <div class="flex flex-row justify-center border border-black">
//             <div class="border border-black w-full">과목명</div>

//             <div class="border border-black w-full">학점/시간</div>

//             <div class="border border-black w-full">교수명</div>

//             <div class="border border-black w-full">연락처</div>
//           </div>
//           <div class="flex w-full justify-center border border-black">
//             {output.length === 0 ? (
//               <div className="flex flex-row justify-center ">
//                 검색결과가 없습니다.
//               </div>
//             ) : (
//               <div className="flex flex-col justify-center w-full ">
//                 {listitem(output)}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LectureRegisterPage;
