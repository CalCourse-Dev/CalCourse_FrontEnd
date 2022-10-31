import "./Dashboard.css";
import QRCard from "./QRCard/QRCard";
import { createContext } from "react";
import { getAllCourses } from "../../requests/get-requests/get-all-courses";

export const courseContext = createContext({});

const Dashboard = () => {

  var array = new Array<any>()

  const consoleHelper = (data: any) => {
    console.log(data);
  };

  const courseHelper = (res: any) => {
    array = res["Items"].map((course: any) => {
      return QRCard(course);
    })
  };

  getAllCourses("email", "password", courseHelper, consoleHelper);

  const testCard = QRCard({
    course_name: "string",
    course_term: "string",
    course_id: "string",
    course_qr_code_url: "string",
  })

  // return value is supposed to be *array*
  return <div id="main-container">{testCard}</div>;
};

export default Dashboard;
