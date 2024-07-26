import React from "react";
import TopHeader from "../../../components/TopHeader";
import MainHeadForm from "./MainHeadForm";

const MainHeadAdd = () => {
  const defaultValues = {
    mainHeadId: "",
    accountType: "",
    mainHeadName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Account Main Head"
        btn="Return"
        path="/ac/settings/mainhead/list"
      />
      <MainHeadForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="mainhead/create"
        returnPath="/ac/settings/mainhead/list"
      />
    </div>
  );
};

export default MainHeadAdd;
