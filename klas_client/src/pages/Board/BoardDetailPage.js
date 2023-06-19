import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { ModalContext } from "../../contexts/ModalContext";
import Button from "../../components/Button";

function BoardDetailPage() {
  const sessionUserID = localStorage.getItem("userId");
  const { userId } = useContext(UserContext);
  const {
    modal,
    setModal,
    modalContent,
    setModalContent,
    boardId,
    setBoardId,
  } = useContext(ModalContext);
  const [data, setData] = useState({
    id: 1,
    title: "교수님 죄송합니다.",
    content: "근데 교수님도 저한테 죄송하지 않으세요?",
    date: "2023/6/16",
    user: { userId: "2018202086" },
    comment: ["ㅇㅈ", "ㅆㅇㅈ"],
  });
  useEffect(() => {
    axios
      .post("http://localhost:8080/board/detail", {
        id: boardId,
      })
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return (
    <div className="flex flex-col justify-start text-[15px] items-center h-full w-full bg-white overflow-y-auto">
      <div className="flex w-full justify-between h-[10%] items-center">
        <div className="flex w-[70%] pl-4 font-bold text-[20px] ">
          {data.title}
        </div>
        <div className="flex pr-4 justify-evenly w-[50%] items-center">
          <div>
            {data.user.userId === sessionUserID ? sessionUserID : "익명"}
          </div>
          <div>{data.date}</div>
          <div
            className="flex "
            onClick={() => {
              setModal(false);
            }}
          >
            <GiCancel size="25" />
          </div>
        </div>
      </div>

      <div className="border-[1px] w-full"></div>
      <div className="flex w-full pl-4 h-[40%]">{data.content}</div>
      <div className="border-[1px] w-full "></div>

      <div className="flex flex-col justify-start w-full h-[30%]">
        <div className="flex w-[70%] pl-4 font-bold text-[20px] ">댓글</div>
        <div className="border-[1px] w-full "></div>

        {data.comment.map((text) => (
          <div>
            <div className="flex pl-4">- {text}</div>
          </div>
        ))}
      </div>

      {data.user.userId === userId ? (
        <div className="w-full flex flex-col h-[10%]">
          <div className="border-[1px] w-full "></div>
          <div className="flex w-full pl-4 h-full justify-end pr-4 items-center">
            <Button
              text={"삭제"}
              onClick={() => {
                axios
                  .post("http://localhost:8080/board/delete", {
                    id: boardId,
                  })
                  .then((res) => {
                    setModal(false);
                  })
                  .catch((err) => {
                    console.log(err.response);
                  });
              }}
            />
            <Button
              text="수정"
              onClick={() => {
                setModalContent(2);
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BoardDetailPage;
