import React from "react";
import { useParams } from "react-router-dom";
import InvestigationDetailsForm from "./InvestigationDetailsForm";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const InvestigationDetailsEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "employeesdetails",
    `/spInvestigation/investigationDetails/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;
  // console.log(id);

  console.log(list.data);

  return (
    <div className="card w-full max-w-screen-xl ">
      <TopHeader
        title="Special Investigation Update"
        btn="Return"
        path={`/audit/investigation/details/${list.data.investigationId}`}
      />

      <InvestigationDetailsForm
        defaultValues={{
          investigationDetailsId: list.data.investigationDetailsId,
          investigationId: list.data.investigationId,
          guideline: list.data.guideline,
          testSteps: list.data.testSteps,
          evidences: list.data.evidences,
          reportInputs: list.data.reportInputs,
        }}
        action={refetch}
        btnText="Update"
        path={`/spInvestigation/detailsUpdate/${id}`}
        returnPath={`/audit/investigation/details/${list.data.investigationId}`}
      />
    </div>
  );
};

export default InvestigationDetailsEdit;
