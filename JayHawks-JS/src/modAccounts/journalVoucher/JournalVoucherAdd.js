import React from "react";
import TopHeader from "../../components/TopHeader";
import JournalVoucherForm from "./JournalVoucherForm";

const JournalVoucherAdd = () => {
  const defaultValues = {
    voucherNumber: "",
  };

  return (
    <div>
      <TopHeader
        title="Add Journal Voucher"
        btn="Return"
        path="/ac/journalVoucher/List"
      />
      <JournalVoucherForm
        defaultValues={defaultValues}
        selectPath="/acLedger/selectByJournal"
        action={() => {}}
        btnText="Add"
        path="/accountGl/journalCreate"
        returnPath="/ac/journalVoucher/List"
      />
    </div>
  );
};

export default JournalVoucherAdd;
