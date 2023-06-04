import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import { Link } from "react-router-dom";

function SignInPage() {
  const [userId, setUserId] = useState("");
  const [password, setPaaword] = useState("");

  return (
    <div class="flex flex-col justify-center items-center  h-screen bg-gradient-to-b from-white to-[#C8D6E8] ">
      <div class="flex justify-center flex-col items-center h-[50%] w-[50%]  rounded-[100px]">
        <div class="text-[100px]">mini-klas</div>
        <Input type="text" onChange={setUserId} placeholder="학번" />
        <Input type="text" onChange={setPaaword} placeholder="비밀번호" />
        <Button
          text="로그인"
          onClick={() => {
            axios
              .post("http://localhost:8080/users/signin", {
                params: {
                  userId: userId,
                  password: password,
                },
              })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err.response);
              });
          }}
        />
        <Link to="/users/signup">
          <Button text="회원가입" />
        </Link>
        <Link to="/home">
          <Button text="test" />
        </Link>
      </div>
    </div>
  );
}

export default SignInPage;
