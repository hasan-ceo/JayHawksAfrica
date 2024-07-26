import React from "react";
import JournalVoucherForm from "./JournalVoucherForm";
import TopHeader from "../../components/TopHeader";

const JournalVoucherAdd = () => {
  const defaultValues = {
    journalVoucherId: "",
    accountHeadDr: "",
    accountHeadCr: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Journal Voucher"
        btn="Return"
        path="/ac/journalVoucher/list"
      />
      <JournalVoucherForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/journalVoucher/create"
        returnPath="/ac/journalVoucher/list"
      />
    </div>
  );
};

export default JournalVoucherAdd;
