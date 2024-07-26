import React from "react";

import { useParams } from "react-router-dom";
import BmCheckForm from "./BmCheckForm";
import TopHeader from "../../../../../../components/TopHeader";


const BmCheckAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    allBmEffectId: 0,
    allVisitId: id,
    strength: "",
    weakness: "",
    actionTaken: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Effectiveness of BM visit: "
        btn="Return"
        path={`/ops/visit/preview/${id}`}
      />
      <BmCheckForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/allBmEffectiveness/create"
        returnPath={`/ops/visit/preview/${id}`}
      />
    </div>
  );
};

export default BmCheckAdd;
