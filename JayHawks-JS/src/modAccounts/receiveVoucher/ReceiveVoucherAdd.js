import React from "react";
import ReceiveVoucherForm from "./ReceiveVoucherForm";
import TopHeader from "../../components/TopHeader";

const ReceiveVoucherAdd = () => {
  const defaultValues = {
    receiveVoucherId: "",
    cashOrBank: "",
    accountHead: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Receive Voucher"
        btn="Return"
        path="/ac/receiveVoucher/list"
      />
      <ReceiveVoucherForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/receiveVoucher/create"
        returnPath="/ac/receiveVoucher/list"
      />
    </div>
  );
};

export default ReceiveVoucherAdd;
