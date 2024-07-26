import React from "react";
import TransferVoucherForm from "./TransferVoucherForm";
import TopHeader from "../../components/TopHeader";

const TransferVoucherAdd = () => {
  const defaultValues = {
    transferVoucherId: "",
    transactionType: "",
    bank: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Transfer Voucher"
        btn="Return"
        path="/ac/transferVoucher/list"
      />
      <TransferVoucherForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/transferVoucher/create"
        returnPath="/ac/transferVoucher/list"
      />
    </div>
  );
};

export default TransferVoucherAdd;
