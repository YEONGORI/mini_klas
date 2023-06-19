import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function Navigation() {
  const [showCategories, setShowCategories] = useState(false);
  const { userTpye, setUserType } = useContext(UserContext);
  const handleMouseEnter = () => {
    setShowCategories(true);
  };

  const handleMouseLeave = () => {
    setShowCategories(false);
  };
  return (
    <div class="h-full w-full flex flex-col">
      <div class="h-full w-full flex flex-row justify-between bg-white  ">
        <Link
          to="/home"
          class="ml-[5%] flex w-[20%] justify-center h-full text-[20px] items-center"
        >
          <div class="text-[30px]">mini-klas</div>
        </Link>

        <div
          class=" ml-[25%] flex w-[50%] justify-evenly h-full text-[20px] items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            to="/register"
            class="flex w-[20%] justify-center rounded-[20px] hover:bg-slate-100 "
          >
            <div>수강신청</div>
          </Link>

          <div class="flex w-[20%] justify-center rounded-[20px] hover:bg-slate-100 ">
            수강관리
          </div>
          <div class="flex w-[20%] justify-center rounded-[20px] hover:bg-slate-100 ">
            학습관리
          </div>
          <Link
            to="/board"
            class="flex w-[20%] justify-center rounded-[20px] hover:bg-slate-100 "
          >
            <div>게시판</div>
          </Link>
        </div>
        <div class="mr-[5%] flex w-[20%] justify-center h-full text-[20px] items-center ">
          <Link
            to="/my"
            class="flex w-[50%] justify-center rounded-[20px] hover:bg-slate-100 "
          >
            <div>MY</div>
          </Link>

          <Link
            to="/"
            class="flex w-[20%] text-[12px] justify-center rounded-[20px] hover:bg-slate-100 "
            onClick={() => {
              setUserType(0);
              localStorage.removeItem("userId");
              localStorage.removeItem("userType");
            }}
          >
            Logout
          </Link>
        </div>
      </div>
      {showCategories && (
        <div
          class=" absolute w-full flex flex-row h-[150px] bg-white border-[1px] rounded-[3px]  mt-[45px] z-[90]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div class="ml-[5%] flex w-[20%] justify-center h-full text-[20px] items-center"></div>
          <div class="ml-[25%] flex w-[50%] justify-evenly h-full text-[20px] items-center">
            <div class="flex flex-col w-[20%] justify-center "></div>
            <div class="flex flex-col w-[20%] justify-center ">
              <Link
                to="/lecture/plan/list"
                class="rounded-[10px] hover:bg-slate-100"
              >
                강의계획서
              </Link>
              <Link
                to="/users/attendance"
                class="rounded-[10px] hover:bg-slate-100"
              >
                출석체크
              </Link>
              <Link to="/users/grade" class="rounded-[10px] hover:bg-slate-100">
                성적
              </Link>
            </div>
            <div class="flex flex-col w-[20%] justify-center ">
              <Link
                to="/lecture/notice/list"
                class="rounded-[10px] hover:bg-slate-100"
              >
                공지
              </Link>
              <Link
                to="/lecture/material/list"
                class="rounded-[10px] hover:bg-slate-100"
              >
                자료실
              </Link>
              <Link
                to="/lecture/assignment/list"
                class="rounded-[10px] hover:bg-slate-100"
              >
                과제
              </Link>
            </div>
            <div class="flex flex-col w-[20%] justify-center "></div>
          </div>
          <div class="mr-[5%] flex w-[20%] justify-center h-full text-[20px] items-center"></div>
        </div>
      )}
    </div>
  );
}

export default Navigation;
