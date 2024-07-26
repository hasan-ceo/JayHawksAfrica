import React from "react";
import TopHeader from "../../../components/TopHeader";
import AuditAreaForm from "./OverallForm";

const AuditAreaAdd = () => {
  const defaultValues = {
    auditAreaId: "",
    auditAreaName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Audit Area"
        btn="Return"
        path="/audit/settings/area/list"
      />
      <AuditAreaForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditAreas/create"
        returnPath="/audit/settings/area/list"
      />
    </div>
  );
};

export default AuditAreaAdd;
