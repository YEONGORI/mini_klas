import React from "react";
import axios from "axios";

function GetImformaiton() {
  console.log(window.localStorage.userId);

  axios
    .post("http://localhost:8080/users/name", {
      userId: window.localStorage.userId,
    })
    .then((res) => {
      console.log(res);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem(
        "subject",
        JSON.stringify(res.data.lectureRegisterDTOList)
      );
      console.log(JSON.stringify(res.data.lectureRegisterDTOList));
    })
    .catch((err) => {
      console.log(err.response);
    });
}

export default GetImformaiton;
