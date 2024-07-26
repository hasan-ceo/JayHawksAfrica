import React from "react";
import { useParams } from "react-router-dom";
import RmCheckForm from "./RmCheckForm";
import { useGetData } from "../../../../../../hooks/dataApi";
import { HashLoading } from "../../../../../../components/Loading";
import Error from "../../../../../../components/Error";
import TopHeader from "../../../../../../components/TopHeader";

const BmCheckEdit = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allBmEffectiveness", `/allRmEffectiveness/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;
  console.log(list.data);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit All Rm Effectiveness: "
        btn="Return"
        path={`/ops/visit/preview/${list.data.allVisitId}`}
      />
      <RmCheckForm
        defaultValues={{
          allRmEffectId: list.data.allRmEffectId,
          allVisitId: list.data.allVisitId,
          strength: list.data.strength,
          weakness: list.data.weakness,
          actionTaken: list.data.actionTaken,
        }}
        action={refetch}
        btnText="Update"
        path="/allRmEffectiveness/update"
        returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
      />
    </div>
  );
};

export default BmCheckEdit;
