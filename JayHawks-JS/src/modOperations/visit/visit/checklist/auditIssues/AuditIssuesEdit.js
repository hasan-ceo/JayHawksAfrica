import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import AuditIssuesForm from "./AuditIssuesForm";

const AuditIssuesEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "AllSettlementAuditIssues",
    `/allSettlementAuditIssues/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Today’s burning issues "
        btn="Return"
        path={`/ops/visit/preview/${list.data.allVisitId}`}
      />
      <AuditIssuesForm
        defaultValues={{
          seAuditIssueId: list.data.seAuditIssueId,
          allVisitId: list.data.allVisitId,
          issues: list.data.issues,
          isSettled: list.data.isSettled,
          pendingReason: list.data.pendingReason,
        }}
        action={refetch}
        btnText="Update"
        path="/allSettlementAuditIssues/update"
        returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
      />
    </div>
  );
};

export default AuditIssuesEdit;
