import React from "react";
import TopHeader from "../../components/TopHeader";
import AuditSpecialInvestigationReportForm from "./AuditSpecialInvestigationReportForm";

const AuditDepartmentReportAdd = () => {
  const defaultValues = {
    SpecialInvestigationAuditReportId: "",
    Year: "",
    ReportingQuarter: "",
    MonthOfAudit: "",
    DepartmentName: "",
    BranchName: "",
    Region: "",
    DetectionMethod: "",
    TypeOfFraud: "",
    WhoMightBeInvolved: "",
    PositionOfFraudster: "",
    lengthOfServiceOfFraudster: "",
    HowIsTheFraudBeingPerpetrated: "",
    NumberOfOccurences: "",
    PotentialWitness: "",
    Statements: "",
    Evidence: "",
    Observations: "",
    DefectiveControlsIdentified: "",
    EstimatedFraudLoss: "",
    Recommendations: "",
    ManagementResponse: "",
    ImplementedBy: "",
    IAInCharge: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Special Investigation Audit Report Create"
        btn="Return"
        path="/audit/auditSpecialInvestigationReport/list"
      />
      <AuditSpecialInvestigationReportForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditSpecialInvestigationAuditReport/create"
        returnPath="/audit/auditSpecialInvestigationReport/list"
      />
    </div>
  );
};

export default AuditDepartmentReportAdd;
