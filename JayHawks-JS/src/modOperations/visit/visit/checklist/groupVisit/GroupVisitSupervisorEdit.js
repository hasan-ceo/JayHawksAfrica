import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import GroupVisitSupervisorForm from "./GroupVisitSupervisorForm";

const GroupVisitSupervisorEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "allVerifyLoanApplication",
    `/allVerifyLoanApplication/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Group Visit"
        btn="Return"
        path={`/ops/visit/preview/${list.data.allVisitId}`}
      />

      {list.data.isSubmit === 1 && (
        <GroupVisitSupervisorForm
          defaultValues={{
            verificationId: list.data.verificationId,
            workToBeDone: list.data.workToBeDone,
            status: list.data.status,
            number: list.data.number,
            findings: list.data.findings,
            takenSteps: list.data.takenSteps,
            bmComments: list.data.bmComments,
            supervisorComments: list.data.supervisorComments,
          }}
          action={refetch}
          btnText="Update"
          path="/allVerifyLoanApplication/updateCommentsByManager"
          returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
        />
      )}
    </div>
  );
};

export default GroupVisitSupervisorEdit;
