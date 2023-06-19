import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function SignUpPage() {
  const [name, setName] = useState("");
  const { userId, setUserId, userType, setUserType } = useContext(UserContext);
  const [password, setPaaword] = useState("");

  return (
    <div class="flex flex-col justify-center items-center  h-screen bg-gradient-to-b from-white to-[#C8D6E8] ">
      <div class="flex justify-center flex-col items-center h-[50%] w-[50%]  rounded-[100px]">
        <div class="text-[100px]">mini-klas</div>

        <Input type="text" onChange={setName} placeholder="이름" />
        <Input type="text" onChange={setUserId} placeholder="학번" />
        <Input type="password" onChange={setPaaword} placeholder="비밀번호" />
        <div class="flex flex-row">
          <label>학생</label>
          <input
            name="type"
            type="radio"
            value="option1"
            onClick={() => {
              setUserType("1");
            }}
          />
          <label>교수</label>
          <input
            name="type"
            value="option2"
            type="radio"
            onClick={() => {
              setUserType("2");
            }}
          />
          <label>관리자</label>
          <input
            name="type"
            value="option3"
            type="radio"
            onClick={() => {
              setUserType("3");
            }}
          />
        </div>
        <div class="flex flex-row">
          <Link to="/">
            <Button text="이전" />
          </Link>
          <Button
            text="가입"
            onClick={() => {
              console.log(name, userId, password, userType);
              axios
                .post("http://localhost:8080/users/signup", {
                  name: name,
                  userId: userId,
                  password: password,
                  userType: userType,
                })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err.response);
                });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
