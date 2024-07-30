import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import InvestigationForm from "./InvestigationForm";

const InvestigationEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("employeesdetails", `/spInvestigation/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Ongoing Investigation Update"
        btn="Return"
        path="/audit/investigation/list"
      />

      <InvestigationForm
        defaultValues={{
          investigationId: list.data.investigationId,
          title: list.data.title,
          branchId: list.data.branchId,
          departmentId: list.data.departmentId,
          investigationDate: new Date(list.data.investigationDate),
        }}
        action={refetch}
        btnText="Update"
        path="/spInvestigation/update"
        returnPath="/audit/investigation/list"
        isEdit={list.data.canEdit}
      />
    </div>
  );
};

export default InvestigationEdit;
