import React from "react";
import { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import Button from "../../components/Button";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import BoardDetailPage from "./BoardDetailPage";
import { ModalContext } from "../../contexts/ModalContext";
import { useEffect } from "react";

function BoardPage() {
  const [data, setData] = useState([
    {
      id: 1,
      title: "교수님 죄송합니다.",
      content: "근데 교수님도 저한테 죄송하지 않으세요?",
      user: { userId: "2018202086" },
    },
    {
      id: 2,
      title: "교수님 죄송합니다.",
      content: "근데 교수님도 저한테 죄송하지 않으세요?",
      user: { userId: "2018202000" },
    },
    {
      id: 3,
      title: "교수님 죄송합니다.",
      content: "근데 교수님도 저한테 죄송하지 않으세요?",
      user: { userId: "2018202000" },
    },
    {
      id: 4,
      title: "교수님 죄송합니다.",
      content: "근데 교수님도 저한테 죄송하지 않으세요?",
      user: { userId: "2018202000" },
    },
    {
      id: 5,
      title: "교수님 죄송합니다.",
      content: "근데 교수님도 저한테 죄송하지 않으세요?",
      user: { userId: "2018202000" },
    },
    {
      id: 6,
      title: "교수님 죄송합니다.",
      content: "근데 교수님도 저한테 죄송하지 않으세요?",
      user: { userId: "2018202000" },
    },
    {
      id: 7,
      title: "교수님 죄송합니다.",
      content: "근데 교수님도 저한테 죄송하지 않으세요?",
      user: { userId: "2018202000" },
    },
  ]);
  const { userId } = useContext(UserContext);
  const {
    modal,
    setModal,
    modalContent,
    setModalContent,
    boardId,
    setBoardId,
  } = useContext(ModalContext);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const sessionUserID = localStorage.getItem("userId");

  /*
  useEffect(() => {
    axios
      .get("http://localhost:8080/board/list")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  */

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handledetail = (e) => {
    const key = e.target.getAttribute("id");
    console.log(key);
    setBoardId(key);
    setModal(true);
    setModalContent(1);
  };
  return (
    <div className="flex flex-col justify-evenly w-full items-center  h-screen bg-gradient-to-b from-white to-[#C8D6E8] overflow-y-auto">
      <div className="flex text-[25px] mt-[3%] w-[60%] h-[5%] border-[2px] items-center bg-white rounded-[10px]">
        <div className="ml-4">자유게시판</div>
      </div>
      {showForm === false ? (
        <div
          className="flex text-[15px]  w-[60%] h-[4%] border-[2px] items-center justify-between bg-white rounded-[10px] hover:bg-slate-200 duration-100"
          onClick={handleToggleForm}
        >
          <div className="ml-4">새 글을 작성해주세요!</div>
          <BsFillPencilFill size="20" className="mr-4" />
        </div>
      ) : (
        <div className="flex flex-col text-[15px]  w-[60%] h-[150px] border-[2px] items-center justify-between bg-white rounded-[10px">
          <input
            type="text"
            placeholder="글 제목"
            className="flex w-full border-[1px] h-[20%] pl-3"
            id="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            type="text"
            placeholder="글 내용"
            className="flex w-full border-[1px] h-[80%] pl-3"
            id="content"
            onchange={(e) => {
              setContent(e.target.value);
            }}
          />
          <div className="flex justify-end w-full pr-[50px]">
            <Button text={"취소"} onClick={handleToggleForm} />
            <Button
              text="작성"
              onClick={() => {
                /*axios
                  .post("http://localhost:8080/board/write", {
                    user: { userId: userId },
                    title: title,
                    content: content,
                  })
                  .then((res) => {
                    console.log(res);
                    handleToggleForm();
                  })
                  .catch((err) => {
                    console.log(err.response);
                  });*/
              }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col  w-[60%] h-[70%]  border-[2px] border-gray-400 bg-white rounded-[10px] overflow-y-auto">
        {data.map((board) => (
          <div className=" inline-block">
            <div
              className="flex flex-col w-full pl-4  h-[150px] justify-evenly hover:bg-slate-200 duration-100"
              onClick={handledetail}
              id={board.id}
            >
              <div className="font-bold text-[20px]" id={board.id}>
                {board.title}
              </div>
              <div className=" text-[15px] " id={board.id}>
                {board.content}
              </div>
              <div id={board.id}>
                {board.user.userId === sessionUserID ? sessionUserID : "익명"}
              </div>
            </div>
            <div className="flex border-[1px] border-gray-400"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BoardPage;
