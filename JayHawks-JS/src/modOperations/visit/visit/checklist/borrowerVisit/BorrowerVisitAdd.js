import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";
import BorrowerVisitForm from "./BorrowerVisitForm";

const BorrowerVisitAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    obdBorrowerId: 0,
    allVisitId: id,
    groupName: "",
    borrowerName: "",
    overdueAmount: 0,
    loanBalance: 0,
    collectedAmount: 0,
    takenAction:""
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Overdue & Bad debt borrowers Visit"
        btn="Return"
        path={`/ops/visit/preview/${id}`}
      />
      <BorrowerVisitForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/allObdBorrowerVisit/create"
        returnPath={`/ops/visit/preview/${id}`}
      />
    </div>
  );
};

export default BorrowerVisitAdd;
