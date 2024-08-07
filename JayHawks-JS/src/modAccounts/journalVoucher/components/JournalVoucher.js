import React from "react";
import { useGlobalContext } from "../../../hooks/context";
import { useForm } from "react-hook-form";

import JournalVoucherCartSave from "./JournalVoucherCartSave";
import JournalVoucherCartList from "./JournalVoucherCartList";
import TopHeader from "../../../components/TopHeader";
import JournalVoucherForm from "./JournalVoucherForm";

const JournalVoucher = () => {
  const value = useGlobalContext();
  const { cartItems, deleteCartItems } = value;

  const journalBalance = cartItems.map((item) => {
    const balance = item.dr - item.cr;
    return {
      ...item,
      balance,
    };
  });

  const totalBalance = journalBalance.reduce((acc, item) => {
    return acc + item.balance;
  }, 0);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Journal Voucher"
        btn="Return"
        path="/ac/journalVoucher/List"
      />

      <JournalVoucherForm />

      <JournalVoucherCartList
        cartItems={cartItems}
        totalBalance={totalBalance}
        emptyCart={value.deleteCartItems}
        deleteCartItem={value.deleteCartItem}
      />

      <JournalVoucherCartSave
        action={deleteCartItems}
        cartItems={cartItems}
        cartLength={cartItems.length}
        totalBalance={totalBalance}
      />
    </div>
  );
};

export default JournalVoucher;
