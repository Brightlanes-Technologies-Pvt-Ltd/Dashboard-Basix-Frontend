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
import Classes from "./components/Classes";
import ClassForm from "./components/Form/ClassForm";
import ProtectedRoute from "./Auth/ProtectedRoute";
import TopicTable from "./components/Table/TopicTable";
import AdminSidebar from "./components/Sidebar/AdminSidebar.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* User Authentication */}
          <Route path="/" element={<Login />} />

          <Route path="/signup" element={<SignUp />} />

          {/* Admin Routes */}

          <Route element={<ProtectedRoute />}>
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/course/:courseId" element={<Classes />} />
            <Route path="/description/:classId" element={<TopicTable />} />
            <Route path="/add-course" element={<ClassForm />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/adminsidebar" element={<AdminSidebar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
