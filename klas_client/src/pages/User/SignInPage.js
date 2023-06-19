import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useRef } from "react";
import { ImBubbles3 } from "react-icons/im";
import { ModalContext } from "../../contexts/ModalContext";
import GetImformaiton from "../../components/GetImformation";

function SignInPage() {
  const [password, setPaaword] = useState("");
  const { userId, setUserId, userType, setUserType } = useContext(UserContext);
  const {
    modal,
    setModal,
    modalContent,
    setModalContent,
    boardId,
    setBoardId,
  } = useContext(ModalContext);
  const [type, setType] = useState(0);
  const radioRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/users",
        {
          userId: userId,
          password: password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log("render");
        localStorage.setItem("userId", userId);
        localStorage.setItem("userType", res.data + 1);
        setUserType(res.data + 1);
        navigate("/home");
        GetImformaiton();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div class="flex flex-col justify-center items-center  h-screen bg-gradient-to-b from-white to-[#C8D6E8]">
      <div class="flex justify-center flex-col items-center h-[50%] w-[50%]  rounded-[100px]">
        <div class="text-[100px]">mini-klas</div>
        <form onSubmit={handleSubmit}>
          <div>
            <Input type="text" onChange={setUserId} placeholder="학번" />
          </div>
          <div class="mt-1">
            <Input
              type="password"
              onChange={setPaaword}
              placeholder="비밀번호"
            />
          </div>

          <div class="flex justify-center flex-row mt-2">
            <Button type="submit" text="로그인" />
            <Link to="/users/signup">
              <Button text="회원가입" />
            </Link>
          </div>
        </form>

        <Link
          to="/home"
          onClick={() => {
            console.log("test");
            setUserType(1);
            setUserId(2018202000);
            localStorage.setItem("userType", 1);
            localStorage.setItem("userId", 2018202000);
            localStorage.setItem("name", "테스트");
            localStorage.setItem(
              "subject",
              JSON.stringify([
                { lectureid: 1, lecturename: "웹프로그래밍" },
                { lectureid: 2, lecturename: "고급프로그래밍" },
              ])
            );
          }}
        >
          <Button text="test" />
        </Link>
        <button
          onClick={() => {
            setModal(true);
            setModalContent(0);
          }}
          class="w-[100px] border-[3px] rounded-[7px] h-[30px] bg-yellow-200 items-center flex justify-center text-center transition-all duration-200 hover:bg-slate-300"
        >
          <ImBubbles3 />
          카카오
        </button>
      </div>
    </div>
  );
}

export default SignInPage;
