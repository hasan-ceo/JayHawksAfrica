import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import GroupVisitForm from "./GroupVisitForm";

const GroupVisitEdit = () => {
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
        title="Edit Group Visit & Verification Of Loan Application "
        btn="Return"
        path={`/ops/visit/preview/${list.data.allVisitId}`}
      />
      <GroupVisitForm
        defaultValues={{
          verificationId: list.data.verificationId,
          workToBeDone: list.data.workToBeDone,
          status: list.data.status,
          number: list.data.number,
          findings: list.data.findings,
          takenSteps: list.data.takenSteps,
        }}
        action={refetch}
        btnText="Update"
        path="/allVerifyLoanApplication/update"
        returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
      />
    </div>
  );
};

export default GroupVisitEdit;
