import React from "react";
import PaymentVoucherForm from "./PaymentVoucherForm";
import TopHeader from "../../components/TopHeader";

const JournalVoucherAdd = () => {
  const defaultValues = {
    paymentVoucherId: "",
    cashOrBank: "",
    accountHead: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Payment Voucher"
        btn="Return"
        path="/ac/paymentVoucher/list"
      />
      <PaymentVoucherForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/paymentVoucher/create"
        returnPath="/ac/paymentVoucher/list"
      />
    </div>
  );
};

export default JournalVoucherAdd;
