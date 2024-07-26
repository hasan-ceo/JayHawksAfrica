import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import ObservationsForm from "./ObservationsForm";

const ObservationsEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditdetails", `/auditObservations/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Audit Observations"
        btn="Return"
        path={`/audit/observations/${list.data.auditId}`}
      />
      <ObservationsForm
        defaultValues={{
          observationsId: list.data.observationsId,
          auditId: list.data.auditId,
          auditArea: list.data.auditArea,
          details: list.data.details,
          rootCause: list.data.rootCause,
          riskRating: list.data.riskRating,
          riskImplication: list.data.riskImplication,
          recommendations: list.data.recommendations,
          attachment: list.data.attachment,
        }}
        action={refetch}
        btnText="Update"
        path="/auditObservations/update"
        returnPath={`/audit/observations/${list.data.auditId}`}
      />
    </div>
  );
};

export default ObservationsEdit;
