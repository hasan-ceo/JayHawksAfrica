import React from "react";
import { useGlobalContext } from "../../hooks/context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const value = useGlobalContext();

  return value.user ? (
    value.role === "Super Admin" ||
    value.role === "Audit Manager" ||
    value.role === "Audit Executive" ? (
      <Outlet />
    ) : (
      <Navigate to="/dashboard" />
    )
  ) : (
    <Navigate to="/backoffice" />
  );
};

export default PrivateRoute;
// state={from: location }
