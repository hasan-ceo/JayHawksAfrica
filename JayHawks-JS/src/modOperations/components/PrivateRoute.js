import React from "react";
import { useGlobalContext } from "../../hooks/context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const value = useGlobalContext();

  return value.user ? (
    value.role === "Super Admin" ||
    value.role === "Operations Head" ||
    value.role === "Operations Manager" ||
    value.role === "Regional Manager" ||
    value.role === "Area Manager" ||
    value.role === "FMPO Executive" ||
    value.role === "FMPO Manager" ||
    value.role === "Branch Manager" ||
    value.role === "Country Team Lead" ? (
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
