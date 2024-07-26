import React from "react";
import { useParams } from "react-router-dom";
import AmRmMonitoringList from "../auditWorkSteps/auditWorkStep/AuditWorkStepList";

const StepTwo = () => {
  const { id } = useParams();

  return (
    <div className="w-full max-w-screen-xl">
      <AmRmMonitoringList auditId={id} />
    </div>
  );
};

export default StepTwo;
