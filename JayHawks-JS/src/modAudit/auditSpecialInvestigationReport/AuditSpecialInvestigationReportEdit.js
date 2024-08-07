import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import AuditSpecialInvestigationReportForm from "./AuditSpecialInvestigationReportForm";

const AuditSpecialInvestigationReportEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "auditAuditBranchDepartmentAuditReport",
    `/auditSpecialInvestigationAuditReport/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Audit SpecialInvestigationAudit Report Update"
        btn="Return"
        path="/audit/specialInvestigationAuditReport/list"
      />

      <AuditSpecialInvestigationReportForm
        defaultValues={{
          specialInvestigationAuditReportId:
            list.data.specialInvestigationAuditReportId,
          year: list.data.year,
          reportingQuarter: list.data.reportingQuarter,
          monthOfAudit: list.data.monthOfAudit,
          departmentName: list.data.departmentName,
          branchId: list.data.branchId,
          region: list.data.region,
          detectionMethod: list.data.detectionMethod,
          typeOfFraud: list.data.typeOfFraud,
          whoMightBeInvolved: list.data.whoMightBeInvolved,
          positionOfFraudster: list.data.positionOfFraudster,
          howIsTheFraudBeingPerpetrated:
            list.data.howIsTheFraudBeingPerpetrated,
          numberOfOccurences: list.data.numberOfOccurences,
          potentialWitness: list.data.potentialWitness,
          Statements: list.data.Statements,
          Evidence: list.data.Evidence,
          observations: list.data.observations,
          defectiveControlsIdentified: list.data.defectiveControlsIdentified,
          estimatedFraudLoss: list.data.estimatedFraudLoss,
          recommendations: list.data.recommendations,
          managementResponse: list.data.managementResponse,
          employeeId: list.data.employeeId,
          iaInCharge: list.data.iaInCharge,
          lengthOfServiceOfFraudster: list.data.lengthOfServiceOfFraudster,
        }}
        action={refetch}
        btnText="Update"
        path="/auditSpecialInvestigationAuditReport/Update"
        returnPath="/audit/auditSpecialInvestigationReport/list"
      />
    </div>
  );
};

export default AuditSpecialInvestigationReportEdit;
