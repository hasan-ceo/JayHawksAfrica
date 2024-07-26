import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import AuditQuestionForm from "./AuditQuestionForm";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

const AuditQuestionEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrAuditQuestion", `/auditQuestion/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Audit Question"
        btn="Return"
        path="/audit/settings/question/list"
      />
      <AuditQuestionForm
        defaultValues={{
          auditQuestionId: list.data.auditQuestionId,
          auditAreaId: list.data.auditAreaId,
          questionName: list.data.questionName,
        }}
        action={refetch}
        btnText="Update"
        path="/auditQuestion/update"
        returnPath="/audit/settings/question/list"
      />
    </div>
  );
};

export default AuditQuestionEdit;
