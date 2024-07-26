import React from "react";

import { useParams } from "react-router-dom";
import AmCheckForm from "./AmCheckForm";
import TopHeader from "../../../../../../components/TopHeader";

const AmCheckAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    allAmEffectId: 0,
    allVisitId: id,
    strength: "",
    weakness: "",
    actionTaken: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Effectiveness of AM visit "
        btn="Return"
        path={`/ops/visit/preview/${id}`}
      />
      <AmCheckForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/allAmEffectiveness/create"
        returnPath={`/ops/visit/preview/${id}`}
      />
    </div>
  );
};

export default AmCheckAdd;
