import './Dashboard.css';
import { createContext, useState } from 'react';
import { Input } from 'antd';
import { CourseData } from '../../utils/interfaces';
import QRCard from './QRCard/QRCard';
import CourseAPI from "../../requests/CourseAPI";

export const courseContext = createContext({});

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState('');
  const courseQRCode = (a: Array<CourseData>) => {
    return a.map((course: CourseData) => {
      return QRCard(course);
    });
  }

  CourseAPI.getAllCourses(
    "huanzhimao@berkeley.edu", // hard-coded, waiting for the completion of log-in page
    "123456", // hard-coded, waiting for the completion of log-in page
    (res: any) => {
      setCourses(res);
    },
    (error: any) => {
      console.log(error);
    });

  var terms = Array.from(new Set(courses.map((course: CourseData) => { return course["course_term"] })));

  return (
    <courseContext.Provider value={{ allTerms: terms }}>
      <Input
        className="searchBar"
        placeholder="Input search text"
        bordered={false}
        onChange={(event: any) => {
          setInput(event.target.value.toLowerCase());
        }}
      />
      <div id="main-container">
        {courseQRCode(courses.filter((course: CourseData) => course["course_name"].toLowerCase().includes(input)
          || course["course_id"].toString().includes(input)))}
      </div>
    </courseContext.Provider>
  );
};

export default Dashboard;
