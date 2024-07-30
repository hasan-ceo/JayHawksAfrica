import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../../components/TopHeader";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import DepartmentalInvestigationDetailsForm from "./DepartmentalInvestigationDetailsForm";

const DepartmentalInvestigationDetailsEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "employeesdetails",
    `/AuditDpInvestigation/DepartmentalInvestigationDetails/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;


  return (
    <div className="card w-full max-w-screen-xl ">
      <TopHeader
        title="Special Functionality Update"
        btn="Return"
        path={`/audit/departmentalInvestigation/details/${list.data.investigationId}`}
      />

      <DepartmentalInvestigationDetailsForm
        defaultValues={{
          investigationDetailsId: list.data.investigationDetailsId,
          investigationId: list.data.investigationId,
          testArea: list.data.testArea,
          testSteps: list.data.testSteps,
          sampleSelectionMethod: list.data.sampleSelectionMethod,
          controlFrequency: list.data.controlFrequency,
          populationSize: list.data.populationSize,
          sampleSize: list.data.sampleSize,
          testConclusion: list.data.testConclusion,
          auditFinding: list.data.auditFinding,
          cause: list.data.cause,
          implication: list.data.implication,
          recommendation: list.data.recommendation,
          controlOwnerResponse: list.data.controlOwnerResponse,
          implementationDate: new Date(list.data.implementationDate),
          managementAction: list.data.managementAction,
          exceptions: list.data.exceptions,
          evidences: list.data.evidences,
        }}
        action={refetch}
        btnText="Update"
        path={`/AuditDpInvestigation/detailsUpdate/${id}`}
        returnPath={`/audit/departmentalInvestigation/details/${list.data.investigationId}`}
      />
    </div>
  );
};

export default DepartmentalInvestigationDetailsEdit;
