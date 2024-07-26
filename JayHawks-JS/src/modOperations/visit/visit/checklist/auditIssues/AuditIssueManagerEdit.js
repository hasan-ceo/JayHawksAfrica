import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../../../hooks/dataApi";
import { HashLoading } from "../../../../../components/Loading";
import Error from "../../../../../components/Error";
import TopHeader from "../../../../../components/TopHeader";
import AuditIssueManagerForm from "./AuditIssueManagerForm";

const AuditIssueManagerEdit = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "allSettlementAuditIssuesdetails",
    `/allSettlementAuditIssues/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit  Settlement Of Audit Issues"
        btn="Return"
        path={`/ops/visit/preview/${list.data.allVisitId}`}
      />

      {list.data.isSubmit === 1 && (
        <AuditIssueManagerForm
          defaultValues={{
            seAuditIssueId: list.data.seAuditIssueId,
            issues: list.data.issues,
            isSettled: list.data.isSettled,
            pendingReason: list.data.pendingReason,
            bmComments: list.data.bmComments,
            supervisorComments: list.data.supervisorComments,
          }}
          action={refetch}
          btnText="Update"
          path="/allSettlementAuditIssues/updateBySupervisor"
          returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
        />
      )}
    </div>
  );
};

export default AuditIssueManagerEdit;
