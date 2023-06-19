import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function LectureMaterialDetailPage() {
  const location = useLocation();
  const [title, setTitle] = useState(location.state.title);
  const [content, setContent] = useState(location.state.content);
  const [materialname, setMaterialname] = useState(location.state.materialname);
  const [materialaddress, setMaterialaddress] = useState(
    location.state.materialaddress
  );
  const [author, setAuthor] = useState(location.state.author);
  const [date, setDate] = useState(location.state.date);
  const [hardcodingUserType, setHardcodingUserType] = useState(
    location.state.hardcodingUserType
  ); //하드코딩
  const [lectureid, setLectureid] = useState(location.state.lectureid);
  const [id, setId] = useState(location.state.id);
  const navigate = useNavigate();

  const handOnclick = () => {
    axios
      .post("http://localhost:8080/lecture/material/delete", {
        id: id,
        lectureid: lectureid,
        title: title,
        content: content,
        materialname: materialname,
        materialaddress: materialaddress,
        author: author,
        date: date,
      })
      .then((res) => {
        console.log(res);
        navigate("/lecture/material/list");
        alert("삭제되었습니다.");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div class="flex flex-col justify-center items-center h-screen border bg-gradient-to-b from-white to-[#C8D6E8]">
      <div class="flex justify-center flex-col items-center h-[600px] w-[1400px] border border-black">
        <div class="flex justify-start w-[90%] h-[10%] mt-4 text-[35px]">
          강의 자료실
        </div>
        <div class="flex justify-start w-[90%] h-[20%] border border-black ">
          <div class="flex flex-col ml-4 mt-4 text-[20px]">
            {title}
            <div class="flex flex-row mt-12 text-[13px]">
              작성자: {author}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;등록일:{date}
            </div>
          </div>
        </div>
        <div class="flex justify-start w-[90%] h-[5%]  border border-dashed border-black ">
          <div class="flex flex-row ml-4 mt-2 text-[13px]">
            첨부파일:&nbsp;&nbsp;&nbsp;
            <a href={materialaddress} download>
              <div className="flex justify-center text-[13px]">
                {materialname}
              </div>
            </a>
          </div>
        </div>
        <div class="flex justify-start w-[90%] h-[50%] border border-black overflow-y-auto ">
          <div class="flex flex-col ml-4  mt-2">
            <div>{content}</div>
          </div>
        </div>

        {hardcodingUserType === 1 ? (
          <div class="flex flex-row justify-center mt-2 w-full h-[5%] ">
            <button
              class="border border-black w-[50px] mr-2"
              onClick={() => {
                navigate("/lecture/material/modify", {
                  state: {
                    author: author,
                    lectureid: lectureid,
                    id: id,
                  },
                });
              }}
            >
              수정
            </button>
            <button
              class="border border-black w-[50px]"
              onClick={() => {
                if (window.confirm("정말로 삭제하시겠습니까?")) {
                  handOnclick();
                } else {
                }
              }}
            >
              삭제
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
export default LectureMaterialDetailPage;
