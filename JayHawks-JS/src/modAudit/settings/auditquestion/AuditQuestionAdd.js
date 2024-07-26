import React from "react";
import TopHeader from "../../../components/TopHeader";
import AuditQuestionForm from "./AuditQuestionForm";

const AuditQuestionAdd = () => {
  const defaultValues = {
    auditQuestionId: "",
    auditAreaId: "",
    questionName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Audit Question"
        btn="Return"
        path="/audit/settings/question/list"
      />
      <AuditQuestionForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditQuestion/create"
        returnPath="/audit/settings/question/list"
      />
    </div>
  );
};

export default AuditQuestionAdd;
