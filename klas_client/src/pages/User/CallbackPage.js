import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import GetImformaiton from "../../components/GetImformation";
function CallbackPage() {
  const location = useLocation();
  const { userId, setUserType } = useContext(UserContext);
  const sessionuserId = localStorage.getItem("userId");
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  // 파라미터 값 가져오기
  const paramValue = params.get("code");
  console.log(paramValue, sessionuserId);
  axios
    .post("http://localhost:8080/users/kakao", {
      userId: sessionuserId,
      code: paramValue,
    })
    .then(() => {
      setUserType(1);
      localStorage.setItem("userType", 1);

      GetImformaiton();
      navigate("/home");
    })
    .catch();
  return (
    <div>
      {paramValue}
      {userId}
    </div>
  );
}
export default CallbackPage;
