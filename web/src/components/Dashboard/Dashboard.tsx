import "./Dashboard.css";
import QRCard from "./QRCard/QRCard";
import { createContext, useState } from "react";
import { getAllCourses } from "../../requests/get-requests/get-all-courses";

export const courseContext = createContext({});

const Dashboard = () => {

  const [array, setArray] = useState([]);

  getAllCourses(
    "email",
    "password",
    (res: any) => {
      setArray(res["Items"].map((course: any) => {
        return QRCard(course);
      }))
    },
    (data: any) => {
      console.log(data);
    });

  return <div id="main-container">{array}</div>;
};

export default Dashboard;
