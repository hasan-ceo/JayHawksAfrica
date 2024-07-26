import React from "react";
import TopHeader from "../../components/TopHeader";
import AuditWorkplanForm from "./AuditWorkplanForm";

const AuditWorkplanAdd = () => {
  const defaultValues = {
    workPlanId: 0,
    monthName: "",
    branchId: "",
    riskRating: 0,
    auditor: "",
    fieldDays: 0,
    expectedCost: 0,
    auditStatus: "Pending",
    reportStatus: "Pending",
    discussionStatus: "Pending",
    followUpStatus: "Pending",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Audit Workplan Add"
        btn="Return"
        path="/audit/workplan/list"
      />
      <AuditWorkplanForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditWorkplan/create"
        returnPath="/audit/workplan/list"
      />
    </div>
  );
};

export default AuditWorkplanAdd;
