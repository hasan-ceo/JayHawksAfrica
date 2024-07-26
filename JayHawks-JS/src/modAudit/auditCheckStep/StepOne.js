import React from "react";

import { useParams } from "react-router-dom";
import MeetingMinutesList from "../auditWorkSteps/entryExitMeeting/MeetingMinutesList";

const StepOne = () => {
  const { id } = useParams();

  return (
    <div className="w-full max-w-screen-xl">
      <MeetingMinutesList auditId={id} />
    </div>
  );
};

export default StepOne;
