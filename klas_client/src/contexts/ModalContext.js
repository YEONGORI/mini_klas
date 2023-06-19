import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = (props) => {
  const [modal, setModal] = useState(0);
  const [modalContent, setModalContent] = useState(0);
  const [boardId, setBoardId] = useState();
  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
        modalContent,
        setModalContent,
        boardId,
        setBoardId,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};
