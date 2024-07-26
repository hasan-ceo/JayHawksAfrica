import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";
import FeedbackMtgForm from "./FeedbackMtgForm";

const FeedbackMtgAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    allFeedbackId: 0,
    allVisitId: id,
    nameOfAttendees: "",
    discussedIssues: "",
    givenFeedback: "",
    remarks: "",
    imageUrl: "1vyhSgRVvN5Y7FaTX2HBLGse7i2BmkDN6",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Feedback Meeting"
        btn="Return"
        path={`/ops/visit/preview/${id}`}
      />
      <FeedbackMtgForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/allFeedback/create"
        returnPath={`/ops/visit/preview/${id}`}
      />
    </div>
  );
};

export default FeedbackMtgAdd;
