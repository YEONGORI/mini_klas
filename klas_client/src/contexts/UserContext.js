import axios from "axios";
import React, { useState, createContext } from "react";

// 새로운 Context 생성
export const UserContext = createContext();

export const UserProvider = (props) => {
  const [userType, setUserType] = useState(0); // 초기 userType 설정
  const [userId, setUserId] = useState();
  const sessionuserId = Number(localStorage.getItem("userId"));
  const sessionuserType = Number(localStorage.getItem("userType"));

  if (!userId && sessionuserId) setUserId(sessionuserId);
  if (!userType && sessionuserType) setUserType(sessionuserType);

  return (
    <UserContext.Provider value={{ userType, setUserType, userId, setUserId }}>
      {props.children}
    </UserContext.Provider>
  );
};
