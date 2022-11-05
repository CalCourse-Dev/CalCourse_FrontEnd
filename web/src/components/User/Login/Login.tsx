import React, { useState } from "react";
// import "./Login.css";
import CourseAPI from "../../../requests/CourseAPI";
import { MissingRecord } from "../../../utils/interfaces";
const Login = () => {
  console.log("Login");
  const data = {
  department_code: "Test",
  course_code: "123",
  lecture_id: "123",
  course_term: "Fa22",
  }
  CourseAPI.reportMissingClass(data, (res) => {console.log(res)}, (err) => {console.log(err)});
  return (
    <div>
      <h1>FIXME</h1>
    </div>
  );
};
export default Login;
