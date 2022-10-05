import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";

import Login from "./components/User/Login/Login";
import UserPortal from "./components/User/UserPortal/UserPortal";
import Signup from "./components/User/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  // > suppose landing page is running on port localhost:3001 and workspace is running on port localhost:3000
  // > user wants to pay for our service so user go to localhost:3001/pricing
  // > after the user go to price page and select the price, it will redirect to localhost:3000/sign-up?item=Plantinum
  // >>	the /sign-up Route currently is a mock up SSO page
  // >>	it will append user_id to query in url and redirect to payment route: /payment?item=Plantinum&user_id=this_is_user_id
  // > after user successfully pay the service, it will redirect to /success-payment?item-Plantinum&user_id=this_is_user_id
  // > on that page, it will redirect to user workspace page. Change the Route /projects/:user_id to /user/:user_id if applicable

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/login-zh" element={<Login_zh />} /> */}
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userportal" element={<UserPortal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
