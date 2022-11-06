import "./Dashboard.css";
import QRCard from "./QRCard/QRCard";
import { createContext, useState } from "react";
import { getAllCourses } from "../../requests/get-requests/get-all-courses";
import { Input } from 'antd';

export const courseContext = createContext({});

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState("");
  const courseQRCode = (a: Array<any>) => {
    return a.map((course: any) => {
      return QRCard(course);
    });
  }

  getAllCourses(
    "email",
    "password",
    (res: any) => {
      setCourses(res["Items"])
    },
    (data: any) => {
      console.log(data);
    });

  var terms = Array.from(new Set(courses.map((course: any) => { return course["course_term"] })));

  return (
    <courseContext.Provider value={{ allTerms: terms }}>
      <Input
        className="searchBar"
        placeholder="Input search text"
        bordered={false}
        onChange={(event: any) => {
          setInput(event.target.value.toUpperCase());
        }}
      />
      <div id="main-container">
        {courseQRCode(courses.filter((course: any) => course["course_name"].includes(input)))}
        {courseQRCode(courses.filter((course: any) => course["course_id"].toString().includes(input)))}
      </div>
    </courseContext.Provider>
  );
};

export default Dashboard;
