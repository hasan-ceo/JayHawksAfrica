import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import AuditWorkStepForm from "./AuditWorkStepForm";

const AuditWorkStepEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditWorkSteps", `/auditWorkSteps/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit AM RM Monitoring"
        btn="Return"
        path={`/audit/checkdetails/${list.data.auditId}/${list.data.auditAreaId}`}
      />
      <AuditWorkStepForm
        defaultValues={{
          auditWorkListId: list.data.auditWorkListId,
          auditYearId: list.data.auditYearId,
          auditAreaId: list.data.auditAreaId,
          auditYear: list.data.auditYear,
          auditId: list.data.auditId,
          auditTestStepsId: list.data.auditTestStepsId,
          testStepsName: list.data.testStepsName,
          testingDate: new Date(list.data.testingDate),
          sampledMonth: new Date(list.data.sampledMonth),
          auditPeriod: list.data.auditPeriod,
          selectionMethod: list.data.selectionMethod,
          controlFrequency: list.data.controlFrequency,
          sampleSize: list.data.sampleSize,
          populationSize: list.data.populationSize,
          testResults: list.data.testResults,
          overallTestConclusion: list.data.overallTestConclusion,
          finding: list.data.finding,
          cause: list.data.cause,
          implication: list.data.implication,
          recommendation: list.data.recommendation,
          branchResponse: list.data.branchResponse,
          implementationDate: new Date(list.data.implementationDate),
          managementAction: list.data.managementAction,
          exceptions: list.data.exceptions,
          testEvidences: list.data.testEvidences,
        }}
        action={refetch}
        btnText="Update"
        path="/auditWorkSteps/update"
        returnPath={`/audit/checkdetails/${list.data.auditId}/${list.data.auditAreaId}`}
      />
    </div>
  );
};

export default AuditWorkStepEdit;
