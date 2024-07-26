import React from "react";
import TopHeader from "../../components/TopHeader";
import CreationForm from "./CreationForm";

const CreationAdd = () => {
  const defaultValues = {
    auditId: "",
    auditName: "",
    branchId: "",
    bmId: "",
    amId: "",
    rmId: "",
    loId: "",
    auditEndDate: "",
    auditStartDate: "",
    periodUnderAudit: "",
    lastAuditPeriod: "",
    auditNotification: "",
    auditObjectives: "",
    auditorsUndertaking: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Create Audit" btn="Return" path="/audit/list" />
      <CreationForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditcreation/create"
        returnPath="/audit/list"
      />
    </div>
  );
};

export default CreationAdd;
