import React from "react";
import PaymentToPartyForm from "./PaymentToPartyForm";
import TopHeader from "../../components/TopHeader";

const PaymentToPartyAdd = () => {
  const defaultValues = {
    paymentToPartyId: "",
    party: "",
    cashOrBank: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Payment To Partty"
        btn="Return"
        path="/ac/paymentParty/list"
      />
      <PaymentToPartyForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/paymentParty/create"
        returnPath="/ac/paymentParty/list"
      />
    </div>
  );
};

export default PaymentToPartyAdd;
