import React from "react";
import OpenningForm from "./OpenningForm";
import TopHeader from "../../components/TopHeader";

const OpenningAdd = () => {
  const defaultValues = {
    ledgerId: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Openning"
        btn="Return"
        path="/ac/settings/openning/list"
      />
      <OpenningForm
        defaultValues={defaultValues}
        selectPath="/acLedger/selectByBank"
        action={() => {}}
        btnText="Save"
        path="/accountGl/openingCreate"
        returnPath="/ac/settings/openning/list"
      />
    </div>
  );
};

export default OpenningAdd;
