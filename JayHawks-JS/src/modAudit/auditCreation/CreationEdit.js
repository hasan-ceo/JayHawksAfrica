import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import CreationForm from "./CreationForm";
import { useGetData } from "../../hooks/dataApi";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";

const CreationEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditcreationdetails", `/auditcreation/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Edit Branch Audit" btn="Return" path="/audit/list" />
      <CreationForm
        defaultValues={{
          auditId: list.data.auditId,
          auditName: list.data.auditName,
          branchId: list.data.branchId,
          bmId: list.data.bmId,
          amId: list.data.amId,
          rmId: list.data.rmId,
          loId: list.data.loId,
          auditStartDate: new Date(list.data.auditStartDate),
          auditEndDate: new Date(list.data.auditEndDate),
          periodUnderAudit: list.data.periodUnderAudit,
          lastAuditPeriod: new Date(list.data.lastAuditPeriod),
          auditNotification: list.data.auditNotification,
          auditObjectives: list.data.auditObjectives,
          auditorsUndertaking: list.data.auditorsUndertaking,
        }}
        action={refetch}
        btnText="Update"
        path="/auditcreation/update"
        returnPath="/audit/list"
      />
    </div>
  );
};

export default CreationEdit;
