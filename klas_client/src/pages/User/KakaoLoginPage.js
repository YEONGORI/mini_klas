import React from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { ImBubbles3 } from "react-icons/im";
import { GiCancel } from "react-icons/gi";

function KakaoLoginPage({ setModal }) {
  const { userId, setUserId } = useContext(UserContext);
  
  console.log(userId);
  return (
    <div className="flex flex-col justify-center text-[15px] items-center h-full w-full bg-yellow-200 ">
      <div className="flex justify-end w-full pr-5 ">
        <div
          className="flex "
          onClick={() => {
            setModal(false);
          }}
        >
          <GiCancel />
        </div>
      </div>
      <div className="flex ">
        <ImBubbles3 size="30" />
        <div className="text-[20px] pl-3 pb-3">카카오로그인</div>
      </div>

      <Input type="text" onChange={setUserId} placeholder="학번" />
      <Link
        to="https://kauth.kakao.com/oauth/authorize?client_id=2ab2ae3d4a5108ea9081265e2802998b&redirect_uri=http://localhost:3000/users/callback&response_type=code"
        className="pt-5"
        onClick={() => {
          localStorage.setItem("userId", userId);
        }}
      >
        <Button text="로그인" />
      </Link>
    </div>
  );
}

export default KakaoLoginPage;
