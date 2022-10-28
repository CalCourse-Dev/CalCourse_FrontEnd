import { createContext } from "react";
import QRCard from './QRCard/QRCard'
import "./Dashboard.css";

export const courseContext = createContext({});

const Dashboard = () => {

  return (
    <div>
      <QRCard course_name = "CS 61A" course_term="FA 22" 
      course_id="21111" course_qr_code_url="https://calcourse.com" />
    </div>
  );
};

export default Dashboard;
