import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import AuditDepartmentReportForm from "./AuditDepartmentReportForm";

const AuditDepartmentReportEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditAuditBranchDepartmentAuditReport", `/auditBranchDepartmentAuditReport/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;


  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Audit Department Report Update"
        btn="Return"
        path="/audit/auditDepartmentReport/list"
      />

      <AuditDepartmentReportForm
        defaultValues={{
          reportId: list.data.reportId,
          year: list.data.year,
          reportingQuarter: list.data.reportingQuarter,
          monthOfAudit: list.data.monthOfAudit,
          departmentName: list.data.departmentName,
          branchId: list.data.branchId,
          region: list.data.region,
          branchOverview: list.data.branchOverview,
          areaOfreview: list.data.areaOfreview,
          detailedAuditFinding: list.data.detailedAuditFinding,
          primaryRootCause: list.data.primaryRootCause,
          riskImplication: list.data.riskImplication,
          recommendations: list.data.recommendations,
          employeeId: list.data.employeeId,
          riskCategory: list.data.riskCategory,
          branchResponse: list.data.branchResponse,
          managementResponse: list.data.managementResponse,
          commitmentDate: new Date(list.data.commitmentDate),
          overallControlsAssessment: list.data.overallControlsAssessment,
          fraudRisk: list.data.fraudRisk,
          repeatFinding: list.data.repeatFinding,
          followUpCommentIfAny: list.data.followUpCommentIfAny,
          iaInCharge: list.data.iaInCharge,
          Appendices: list.data.Appendices,
        }}
        action={refetch}
        btnText="Update"
        path="/auditBranchDepartmentAuditReport/Update"
        returnPath="/audit/auditDepartmentReport/list"
      />
    </div>
  );
};

export default AuditDepartmentReportEdit;
