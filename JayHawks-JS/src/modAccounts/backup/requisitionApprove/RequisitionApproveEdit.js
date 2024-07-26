import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import RequisitionApproveForm from "./RequisitionApproveForm";

const RequisitionApproveEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "requisitionApprove",
    `/accounts/requisitionApprove/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Requisition Approve"
        btn="Return"
        path="/accounts/requisitionapprove/list"
      />
      <RequisitionApproveForm
        defaultValues={{
          entryBy: list.data.entryBy,
          particulars: list.data.particulars,
          amount: list.data.amount,
          approved: list.data.approved,
          approvedBy: list.data.approvedBy,
          workDate: new Date(list.data.workDate),
        }}
        action={refetch}
        btnText="Update"
        path="/accounts/requisitionApprove/update"
        returnPath="/accounts/requisitionapprove/list"
      />
    </div>
  );
};

export default RequisitionApproveEdit;
