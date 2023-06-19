import React from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import StudentGradePage from "./StudentGradePage";
import ProfessorGradePage from "./ProfessorGradePage";

function GradePage() {
  const { userType } = useContext(UserContext);
  console.log("efefefeefef");
  return (
    <div>{userType === 1 ? <StudentGradePage /> : <ProfessorGradePage />};</div>
  );
}

export default GradePage;
