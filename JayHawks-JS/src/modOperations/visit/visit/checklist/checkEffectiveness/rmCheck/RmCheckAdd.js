import React from "react";
import { useParams } from "react-router-dom";
import RmCheckForm from "./RmCheckForm";
import TopHeader from "../../../../../../components/TopHeader";

const RmCheckAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    allRmEffectId: 0,
    allVisitId: id,
    strength: "",
    weakness: "",
    actionTaken: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Effectiveness of RM visit: "
        btn="Return"
        path={`/ops/visit/preview/${id}`}
      />
      <RmCheckForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/allRmEffectiveness/create"
        returnPath={`/ops/visit/preview/${id}`}
      />
    </div>
  );
};

export default RmCheckAdd;
