import './Dashboard.css';
import { createContext, useState } from 'react';
import { Input, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { CourseData } from '../../utils/interfaces';
import QRCard from './QRCard/QRCard';
import CourseAPI from "../../requests/CourseAPI";

export const courseContext = createContext({});

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState('');
  const [terms, setTerms] = useState('');
  const courseQRCode = (a: Array<CourseData>) => {
    return a.map((course: CourseData) => {
      return QRCard(course);
    });
  }
  const termOnChange = ({ target: { value } }: RadioChangeEvent) => setTerms(value);
  const parseTerm = (x: string) => {
    if (/^(FA|SP|SU|Fa|Sp|Su|Lf|Mj|Ar)(\d\d)$/gi.test(x)) {
      let season: { [name: string]: string } = {};
      season.FA = "Fall";
      season.SP = "Spring";
      season.SU = "Summer"
      season.Fa = "Fall";
      season.Sp = "Spring";
      season.Su = "Summer";
      season.Lf = "Cal Life";
      season.Mj = "专业群";
      season.Ar = "学术资源";
      let year = (y: string) => {
        if (parseInt(y) >= 22) {
          return String(2000 + parseInt(y));
        }
        return ""
      };
      return season[x.substring(0, 2)] + " " + year(x.substring(2));
    } else {
      let cap = x.substring(0, 1).toUpperCase();
      return cap + x.substring(1).toLowerCase();
    }
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

  let allTerms = Array.from(new Set(courses.map((course: CourseData) => {
    return parseTerm(course["course_term"]);
  })));

  return (
    <courseContext.Provider value={allTerms}>
      <div id="main">
        <h1 id="title">Cal Course</h1>
        <Input
          id="searchBar"
          placeholder="搜索课号"
          bordered={false}
          onChange={(event: any) => {
            setInput(event.target.value.toLowerCase());
          }}
        />
        <Radio.Group
          id="filterBar"
          options={allTerms}
          onChange={termOnChange}
          value={terms}
          optionType="button"
          buttonStyle="solid"
        />
        <div id="main-container">
          {courseQRCode(courses.filter((course: CourseData) => {
            return (course["course_name"].toLowerCase().includes(input)
              || course["course_id"].toString().includes(input))
              && parseTerm(course["course_term"]).includes(terms)
          }))}
        </div>
      </div>
    </courseContext.Provider>
  );
};

export default Dashboard;
