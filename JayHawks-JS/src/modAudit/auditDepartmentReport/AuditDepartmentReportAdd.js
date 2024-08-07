import React from "react";
import TopHeader from "../../components/TopHeader";
import AuditDepartmentReportForm from "./AuditDepartmentReportForm";

const AuditDepartmentReportAdd = () => {
  const defaultValues = {
    ReportId: "",
    Year: "",
    ReportingQuarter: "",
    MonthOfAudit: "",
    DepartmentName: "",
    BranchName: "",
    Region: "",
    BranchOverview: "",
    AreaOfReview: "",
    DetailedAuditFinding: "",
    PrimaryRootCause: "",
    RiskImplication: "",
    Recommendations: "",
    ImplementedBy: "",
    RiskCategory: "",
    BranchResponse: "",
    ManagementResponse: "",
    CommitmentDate: new Date(),
    OverallControlsAssessment: "",
    FraudRisk: "",
    RepeatFinding: "",
    FollowUpCommentIfAny: "",
    IAInCharge: "",
    Appendices: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Special Investigation Report Create"
        btn="Return"
        path="/audit/auditDepartmentReport/list"
      />
      <AuditDepartmentReportForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditBranchDepartmentAuditReport/create"
        returnPath="/audit/auditDepartmentReport/list"
      />
    </div>
  );
};

export default AuditDepartmentReportAdd;
