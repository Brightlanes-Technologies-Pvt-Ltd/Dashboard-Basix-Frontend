import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  const location = useLocation();
  const loggedInUser = useSelector((state) => state.user.user);
  console.log(loggedInUser);

  return loggedInUser.status === true ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
