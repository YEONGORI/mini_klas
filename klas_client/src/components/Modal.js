import { useState, useRef } from "react";
import KakaoLoginPage from "../pages/User/KakaoLoginPage";
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import BoardDetailPage from "../pages/Board/BoardDetailPage";
import BoardUpdatePage from "../pages/Board/BoardUpdatePage";

function Modal() {
  const {
    modal,
    setModal,
    modalContent,
    setModalContent,
    boardId,
    setBoardId,
  } = useContext(ModalContext); //modalContent 0 카카오로그인, 1 게시판
  const ModalBG = useRef();

  return (
    <div className="w-full z-0 fixed text-4xl">
      {modal ? (
        <div
          className="w-full h-screen bg-black bg-opacity-30 flex justify-center items-center"
          ref={ModalBG}
          onClick={(e) => {
            if (ModalBG.current === e.target) {
              setModal(false);
            }
          }}
        >
          <div className="z-25 w-[40%] h-[50%] bg-white fixed">
            {modalContent === 0 ? (
              <KakaoLoginPage setModal={setModal} />
            ) : modalContent === 1 ? (
              <BoardDetailPage />
            ) : modalContent === 2 ? (
              <BoardUpdatePage />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Modal;
