import React from "react";
import TopHeader from "../../components/TopHeader";
import CreationForm from "./CreationForm";

const CreationAdd = () => {
  const defaultValues = {
    creationId: "",
    creationName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Creation"
        btn="Return"
        path="/hr/settings/creation/list"
      />
      <CreationForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/creations/create"
        returnPath="/hr/settings/creation/list"
      />
    </div>
  );
};

export default CreationAdd;
