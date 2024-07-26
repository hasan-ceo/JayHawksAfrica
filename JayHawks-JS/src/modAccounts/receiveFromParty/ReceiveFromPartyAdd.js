import React from "react";
import ReceiveFromPartyForm from "./ReceiveFromPartyForm";
import TopHeader from "../../components/TopHeader";

const ReceiveFromPartyAdd = () => {
  const defaultValues = {
    receiveFromPartyId: "",
    party: "",
    cashOrBank: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Receive From Party"
        btn="Return"
        path="/ac/receiveParty/list"
      />
      <ReceiveFromPartyForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/receiveParty/create"
        returnPath="/ac/receiveParty/list"
      />
    </div>
  );
};

export default ReceiveFromPartyAdd;
