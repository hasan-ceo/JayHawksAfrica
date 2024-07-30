import React from "react";
import OpenningForm from "./OpenningForm";
import TopHeader from "../../components/TopHeader";

const OpenningEdit = () => {
  const defaultValues = {
    ledgerId: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Payment Voucher By Cash"
        btn="Return"
        path="/ac/paymentVoucher/list"
      />
      <OpenningForm
        defaultValues={defaultValues}
        selectPath="/acLedger/selectByCash"
        action={() => {}}
        btnText="Save"
        path="/accountGl/paymentCreate"
        returnPath="/ac/paymentVoucher/list"
      />
    </div>
  );
};

export default OpenningEdit;
