import React from "react";
import { useState } from "react";
import Button from "../../components/Button";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

function BoardUpdatePage() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const { userType, setUserType, userId, setUserId } = useContext(UserContext);
  const {
    modal,
    setModal,
    modalContent,
    setModalContent,
    boardId,
    setBoardId,
  } = useContext(ModalContext);
  return (
    <div className="flex flex-col justify-evenly text-[15px] items-center h-full w-full bg-white ">
      <input
        type="text"
        placeholder="글 제목"
        className="flex w-full border-[1px] h-[20%] pl-3"
        id="title"
        onchange={(e) => {
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
        <Button
          text={"취소"}
          onClick={() => {
            setModal(false);
          }}
        />
        <Button
          text="수정"
          onClick={() => {
            axios
              .post("http://localhost:8080/board/update", {
                user: { userId: userId },
                id: boardId,
                title: title,
                content: content,
              })
              .then((res) => {
                console.log(res);
                setModal(false);
              })
              .catch((err) => {
                console.log(err.response);
              });
          }}
        />
      </div>
    </div>
  );
}

export default BoardUpdatePage;
