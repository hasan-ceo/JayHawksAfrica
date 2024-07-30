import React from "react";
import ReceivePartyForm from "./ReceivePartyForm";
import TopHeader from "../../components/TopHeader";

const ReceivePartyByCash = () => {
  const defaultValues = {
    transType: "Cash",
    partyId: "",
    headName: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Receive Party Voucher By Cash"
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

export default ReceivePartyByCash;
