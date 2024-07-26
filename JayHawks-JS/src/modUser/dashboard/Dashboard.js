import React from "react";
import BoardNotice from "./BoardNotice";
import Clock from "./Clock";
import MainModules from "./MainModules";
import { useGlobalContext } from "../../hooks/context";
import Notification from "./Notification";
import Welcome from "./Welcome";

const Dashboard = () => {
  const value = useGlobalContext();
  return (
    <>
      {value.role === "Super Admin" && <MainModules />}
      <div className="card w-full max-w-screen-xl mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="inline-block align-middle">
            <Clock />
          </div>
          <Welcome />
        </div>
      </div>

      {(value.role === "Super Admin" ||
        value.role === "Accounts Manager" ||
        value.role === "Audit Manager" ||
        value.role === "Operations Head" ||
        value.role === "Operations Manager" ||
        value.role === "Regional Manager" ||
        value.role === "Area Manager" ||
        value.role === "Branch Manager" ||
        value.role === "HR Manager" ||
        value.role === "HR Executive") && (
        <div className="card w-full max-w-screen-xl mb-4">
          <Notification />
        </div>
      )}
      <BoardNotice />
    </>
  );
};

export default Dashboard;
