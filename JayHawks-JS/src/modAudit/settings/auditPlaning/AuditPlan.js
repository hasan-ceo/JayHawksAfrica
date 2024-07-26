import React from "react";
import AuditPlaningDetailsList from "./AuditPlaningDetailsList";
import AuditPlanMaster from "./AuditPlanMaster";

const AuditPlan = () => {
  return (
    <div>
      <AuditPlanMaster />
      <AuditPlaningDetailsList />
    </div>
  );
};

export default AuditPlan;
