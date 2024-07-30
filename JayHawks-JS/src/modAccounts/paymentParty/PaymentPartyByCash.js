import React from "react";
import PaymentPartyForm from "./PaymentPartyForm";
import TopHeader from "../../components/TopHeader";

const PaymentPartyByCash = () => {
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
        title="Add Payment Party Voucher By Cash"
        btn="Return"
        path="/ac/paymentParty/list"
      />
      <PaymentPartyForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/accountGl/paymentPartyCreate"
        returnPath="/ac/paymentParty/list"
      />
    </div>
  );
};

export default PaymentPartyByCash;
