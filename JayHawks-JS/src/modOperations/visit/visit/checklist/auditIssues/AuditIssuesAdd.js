import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";
import AuditIssuesForm from "./AuditIssuesForm";

const AuditIssuesAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    seAuditIssueListId: 0,
    allVisitId: id,
    issues: "",
    isSettled: "",
    pendingReason: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="6.	Settlement of Audit Issues "
        btn="Return"
        path={`/ops/visit/preview/${id}`}
      />
      <AuditIssuesForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/allSettlementAuditIssues/create"
        returnPath={`/ops/visit/preview/${id}`}
      />
    </div>
  );
};

export default AuditIssuesAdd;
