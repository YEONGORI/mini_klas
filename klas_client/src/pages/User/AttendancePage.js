import React from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import StudentAttendancePage from "./StudentAttendancePage";
import ProfessorAttendancePage from "./ProfessorAttendancePage";
import { useEffect } from "react";

function AttendancePage() {
  const { userType } = useContext(UserContext);

  return (
    <div>
      {userType === 1 ? <StudentAttendancePage /> : <ProfessorAttendancePage />}
      ;
    </div>
  );
}

export default AttendancePage;
