import React from "react";
import ReceivePartyForm from "./ReceivePartyForm";
import TopHeader from "../../components/TopHeader";

const ReceivePartyByBank = () => {
  const defaultValues = {
    transType: "Bank",
    partyId: "",
    headName: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Receive Party Voucher By Bank"
        btn="Return"
        path="/ac/receiveParty/list"
      />
      <ReceivePartyForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/accountGl/receivePartyCreate"
        returnPath="/ac/receiveParty/list"
      />
    </div>
  );
};

export default ReceivePartyByBank;
