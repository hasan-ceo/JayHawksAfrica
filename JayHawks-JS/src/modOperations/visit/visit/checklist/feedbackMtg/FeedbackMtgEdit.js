import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";

import FeedbackMtgForm from "./FeedbackMtgForm";

const FeedbackMtgEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allFeedback", `/allFeedback/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Feedback Message"
        btn="Return"
        path={`/ops/visit/preview/${list.data.allVisitId}`}
      />
      <FeedbackMtgForm
        defaultValues={{
          allFeedbackId: list.data.allFeedbackId,
          allVisitId: list.data.allVisitId,
          nameOfAttendees: list.data.nameOfAttendees,
          discussedIssues: list.data.discussedIssues,
          givenFeedback: list.data.givenFeedback,
          remarks: list.data.remarks,
          imageUrl: list.data.imageUrl,
        }}
        action={refetch}
        btnText="Update"
        path="/allFeedback/update"
        returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
      />
    </div>
  );
};

export default FeedbackMtgEdit;
