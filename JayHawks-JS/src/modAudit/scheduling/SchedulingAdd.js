import React from "react";
import TopHeader from "../../components/TopHeader";
import SchedulingForm from "./SchedulingForm";

const SchedulingAdd = () => {
  const defaultValues = {
    creationId: "",
    creationName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Scheduling"
        btn="Return"
        path="/hr/settings/creation/list"
      />
      <SchedulingForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/creations/create"
        returnPath="/hr/settings/creation/list"
      />
    </div>
  );
};

export default SchedulingAdd;
