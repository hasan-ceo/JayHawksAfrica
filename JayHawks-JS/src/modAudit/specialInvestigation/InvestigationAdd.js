import React from "react";
import TopHeader from "../../components/TopHeader";
import InvestigationForm from "./InvestigationForm";

const InvestigationAdd = () => {
  const defaultValues = {
    investigationId: "",
    title: "",
    branchId: "",
    departmentId: "",
    investigationDate: new Date(),
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Ongoing Investigation Create"
        btn="Return"
        path="/audit/investigation/list"
      />
      <InvestigationForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/spInvestigation/create"
        returnPath="/audit/investigation/list"
      />
    </div>
  );
};

export default InvestigationAdd;
