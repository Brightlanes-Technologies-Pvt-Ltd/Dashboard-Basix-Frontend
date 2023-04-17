import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ForgotPassword from "./Auth/ForgotPassword";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Transactions from "./Pages/Transactions/Transactions";
import Homepage from "./components/Homepage/Homepage";
import Activity from "./Pages/Activity/Activity";
import Documents from "./Pages/Documents/Documents";
import Personal from "./Pages/Personal/Personal";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/personal" element={<Personal />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
