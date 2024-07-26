import React from "react";
import TopHeader from "../../components/TopHeader";
import RequisitionApproveForm from "./RequisitionApproveForm";

const RequisitionApproveAdd = () => {
  const defaultValues = {
    entryBy: "",
    particulars: "",
    amount: "",
    approved: false,
    approvedBy: "",
    workDate: new Date(),
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Requisition Approve"
        btn="Return"
        path="/accounts/requisitionapprove/list"
      />
      <RequisitionApproveForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/accounts/requisitionApprove/create"
        returnPath="/accounts/requisitionapprove/list"
      />
    </div>
  );
};

export default RequisitionApproveAdd;
