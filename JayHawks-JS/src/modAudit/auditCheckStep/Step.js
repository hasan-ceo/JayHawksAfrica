import React from "react";
import { useParams } from "react-router-dom";
import MeetingMinutesList from "../auditWorkSteps/entryExitMeeting/MeetingMinutesList";
import AuditWorkStepList from "../auditWorkSteps/auditWorkStep/AuditWorkStepList";

const Step = () => {
  const { id, areaId } = useParams();

  return (
    <div className="w-full max-w-screen-xl">
      {areaId === "1" ? (
        <MeetingMinutesList auditId={id} auditAreaId={areaId} />
      ) : (
        <AuditWorkStepList auditId={id} auditAreaId={areaId} />
      )}
    </div>
  );
};

export default Step;
