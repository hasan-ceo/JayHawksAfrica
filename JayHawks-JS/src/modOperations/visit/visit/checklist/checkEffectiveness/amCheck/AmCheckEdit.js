import React from "react";
import { useParams } from "react-router-dom";
import AmCheckForm from "./AmCheckForm";
import { useGetData } from "../../../../../../hooks/dataApi";
import { HashLoading } from "../../../../../../components/Loading";
import Error from "../../../../../../components/Error";
import TopHeader from "../../../../../../components/TopHeader";

const AmCheckEdit = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allAmEffectiveness", `/allAmEffectiveness/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;
  console.log(list.data);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit All Am Effectiveness: "
        btn="Return"
        // path={`/ops/bm/visit/preview/${list.data.bmVisitId}`}
      />
      <AmCheckForm
        defaultValues={{
          allAmEffectId: list.data.allAmEffectId,
          allVisitId: list.data.allVisitId,
          strength: list.data.strength,
          weakness: list.data.weakness,
          actionTaken: list.data.actionTaken,
        }}
        action={refetch}
        btnText="Update"
        path="/allAmEffectiveness/update"
        returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
      />
    </div>
  );
};

export default AmCheckEdit;
