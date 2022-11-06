import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";

import Login from "./components/User/Login/Login";
import UserPortal from "./components/User/UserPortal/UserPortal";
import CodingLounge from "./components/CodingLounge/CodingLounge";
import Dashboard from "./components/Dashboard/Dashboard";
import AcademicPanel from "./components/AcademicPanel/AcademicPanel";
import EventOverview from "./components/Event/EventOverview";
import Test from "./test";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/coding-lounge" element={<CodingLounge />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/academic-panel" element={<AcademicPanel />} />
        <Route path="/userportal" element={<UserPortal />} />
        <Route path="/event-overview" element={<EventOverview />} />
        <Route path="/testing" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
