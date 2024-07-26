import React from "react";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const RequisitionApproveList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("requisitionApprove", "/accounts/requisitionApprove/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Requisition Approve"
        btn="Save"
        path="/accounts/requisitionapprove/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          <ListHeader label="Entry By" />
          <ListHeader label="Particulars" />
          <ListHeader label="Amount" />
          <ListHeader label="Approved" />
          <ListHeader label="Approved By" />
          <ListHeader label="Work Date" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.Id}
              className="grid grid-cols-1 md:grid-cols-6 list-body"
            >
              <ListCol label="Entry By:" value={item.entryBy} />
              <ListCol label="Particulars:" value={item.particulars} />
              <ListCol label="Amount:" value={item.amount} />
              <ListCol label="Approved By:" value={item.approvedBy} />
              <ListCol label="Approved:" value={item.approved} />
              <ListCol label="Work Date:" value={item.workDate} />
            </div>
          ))}
        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequisitionApproveList;
