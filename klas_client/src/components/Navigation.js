import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div class="h-full w-full flex flex-row justify-between bg-white">
      <Link
        to="/home"
        class="ml-[5%] flex w-[20%] justify-center h-full text-[20px] items-center"
      >
        <div class="text-[30px]">mini-klas</div>
      </Link>

      <div class=" ml-[25%] flex w-[50%] justify-evenly h-full text-[30px] items-center">
        <div class="flex w-[20%] justify-center ">수강신청</div>
        <div class="flex w-[20%] justify-center ">수강관리</div>
        <div class="flex w-[20%] justify-center ">학습관리</div>
        <div class="flex w-[20%] justify-center ">게시판</div>
      </div>
      <div class="mr-[5%] flex w-[20%] justify-center h-full text-[30px] items-center">
        MY
      </div>
    </div>
  );
}

export default Navigation;
