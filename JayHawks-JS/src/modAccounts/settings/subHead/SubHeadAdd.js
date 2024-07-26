import React from "react";
import TopHeader from "../../../components/TopHeader";
import SubHeadForm from "./SubHeadForm";

const SubHeadAdd = () => {
  const defaultValues = {
    subHeadId: "",
    mainHeadId: "",
    subHeadName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Account Sub Head"
        btn="Return"
        path="/ac/settings/subhead/list"
      />
      <SubHeadForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/subhead/create"
        returnPath="/ac/settings/subhead/list"
      />
    </div>
  );
};

export default SubHeadAdd;
