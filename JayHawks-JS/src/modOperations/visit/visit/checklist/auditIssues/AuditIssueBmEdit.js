import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import AduitIssueBmForm from "./AduitIssueBmForm";


const AuditIssueBmEdit = () => {
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
        <AduitIssueBmForm
          defaultValues={{
            seAuditIssueId: list.data.seAuditIssueId,
            allVisitId: list.data.allVisitId,
            issues: list.data.issues,
            isSettled: list.data.isSettled,
            pendingReason: list.data.pendingReason,
            bmComments: list.data.bmComments,
          }}
          action={refetch}
          btnText="Update"
          path="/allSettlementAuditIssues/updateByBm"
          returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
        />
      )}
    </div>
  );
};

export default AuditIssueBmEdit;
