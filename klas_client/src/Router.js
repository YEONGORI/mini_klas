import React, { Component } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/User/SignUpPage";
import SignInPage from "./pages/User/SignInPage";
import HomePage from "./pages/Home/HomePage";
import Navigation from "./components/Navigation";
import { UserContext } from "./contexts/UserContext";
import { useContext } from "react";
//////////////////////////////////////////////////////////////////////////////
import LecturePlanDetailPage from "./pages/Lecture/LecturePlan/LecturePlanDetailPage";
import LecturePlanListPage from "./pages/Lecture/LecturePlan/LecturePlanListPage";

import LectureMaterialListPage from "./pages/Lecture/LectureMaterial/LectureMaterialListPage";
import LectureMaterialDetailPage from "./pages/Lecture/LectureMaterial/LectueMaterialDetailPage";
import LectureNoticeDetailPage from "./pages/Lecture/LectureNotice/LectureNoticeDetailpage";
import LectureNoticeListPage from "./pages/Lecture/LectureNotice/LectureNoticeListpage";
import LectureMaterialWritePage from "./pages/Lecture/LectureMaterial/LectureMaterialWritePage";
import LectureMaterialModifyPage from "./pages/Lecture/LectureMaterial/LectureMaterialModifyPage";
import LectureNoticeWritePage from "./pages/Lecture/LectureNotice/LectureNoticeWritePage";
import LectureNoticeModifyPage from "./pages/Lecture/LectureNotice/LectureNoticeModifyPage";
import LectureAssignmentListPage from "./pages/Lecture/LectureAssignment/LectureAssignmentListPage";
import LectureAssignmentWritePage from "./pages/Lecture/LectureAssignment/LectureAssignmentWritePage";
import LectureAssignmentDetailpage from "./pages/Lecture/LectureAssignment/LectureAssignmentDetailpage";
import LectureAssignmentModifyPage from "./pages/Lecture/LectureAssignment/LectureAssignmentModifyPage";

//////////////////////////////////////////////////////////////////////////////
import GradePage from "./pages/User/GradePage";
import Modal from "./components/Modal";
import CallbackPage from "./pages/User/CallbackPage";
import RegisterPage from "./pages/Register/RegisterPage";
import MyPage from "./pages/My/MyPage";
import BoardPage from "./pages/Board/BoardPage";
import { ModalContext } from "./contexts/ModalContext";
import AttendancePage from "./pages/User/AttendancePage";
function Router() {
  const { userType, setUserType } = useContext(UserContext); //0은 비회원 1은 학생 2는 교수 3은 관리자
  const { modal, setModal } = useContext(ModalContext);
  return (
    <div class="flex flex-col h-screen pt-[10px]">
      <BrowserRouter>
        {userType !== 0 ? (
          <div class=" ">
            <Navigation />
          </div>
        ) : (
          ""
        )}
        <Modal />
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/users">
            <Route path="grade" element={<GradePage />} />
            <Route
              path="signin"
              element={<SignInPage modal={modal} setModal={setModal} />}
            />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="callback" element={<CallbackPage />} />
            <Route path="attendance" element={<AttendancePage />} />
          </Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/lecture/plan">
            <Route path="list" element={<LecturePlanListPage />} />
            <Route path="detail" element={<LecturePlanDetailPage />} />
          </Route>

          <Route path="/lecture/material">
            <Route path="list" element={<LectureMaterialListPage />} />
            <Route path="detail" element={<LectureMaterialDetailPage />} />
            <Route path="write" element={<LectureMaterialWritePage />} />
            <Route path="modify" element={<LectureMaterialModifyPage />} />
          </Route>
          <Route path="/lecture/notice">
            <Route path="list" element={<LectureNoticeListPage />} />
            <Route path="detail" element={<LectureNoticeDetailPage />} />
            <Route path="write" element={<LectureNoticeWritePage />} />
            <Route path="modify" element={<LectureNoticeModifyPage />} />
          </Route>
          <Route path="/lecture/assignment">
            <Route path="list" element={<LectureAssignmentListPage />} />
            <Route path="write" element={<LectureAssignmentWritePage />} />
            <Route path="detail" element={<LectureAssignmentDetailpage />} />
            <Route path="modify" element={<LectureAssignmentModifyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
