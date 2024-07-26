import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import DocCheckSupervisorForm from "./DocCheckSupervisorForm";

const DocCheckManagerCommentsEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allCashBalance", `/allDocCheck/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Documentation Check"
        btn="Return"
        path={`/ops/visit/preview/${list.data.allVisitId}`}
      />

      {list.data.isSubmit === 1 && (
        <DocCheckSupervisorForm
          defaultValues={{
            docCheckId: list.data.docCheckId,
            workToBeDone: list.data.workToBeDone,
            status: list.data.status,
            identifiedMajor: list.data.identifiedMajor,
            takenSteps: list.data.takenSteps,
            bmComments: list.data.bmComments,
            supervisorComments: list.data.supervisorComments,
          }}
          action={refetch}
          btnText="Update"
          path="/allDocCheck/updateBySupervisor"
          returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
        />
      )}
    </div>
  );
};

export default DocCheckManagerCommentsEdit;
