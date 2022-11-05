import "./Dashboard.css";
import QRCard from "./QRCard/QRCard";
import { createContext, useState } from "react";
import { getAllCourses } from "../../requests/get-requests/get-all-courses";
import { Input } from 'antd';

export const courseContext = createContext({});

const Dashboard = () => {

  var terms = new Array<string>();

  const [array, setArray] = useState([]);

  const { Search } = Input;

  getAllCourses(
    "email",
    "password",
    (res: any) => {
      setArray(res["Items"])
    },
    (data: any) => {
      console.log(data);
    });

  var courseQRCode = (a: Array<any>) => {
    return a.map((course: any) => {
      return QRCard(course);
    });
  }

  const onSearch = (value: string) => {
    return <div id="main-container">{courseQRCode(array.filter((course: any) => course["course_name"].includes(value)))}</div>;
  };

  terms = Array.from(new Set(array.map((course: any) => { return course["course_term"] })));

  return (
    <courseContext.Provider value={{ allTerms: terms }}>
      <Search
        placeholder="Input search text"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </courseContext.Provider>
  );
};

export default Dashboard;
