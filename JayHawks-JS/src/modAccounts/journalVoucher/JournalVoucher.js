import React, { useState } from "react";
import TopHeader from "../../components/TopHeader";
import JournalVoucherAdd from "./JournalVoucherAdd";
import { useGlobalContext } from "../../hooks/context";
import { TiDelete } from "react-icons/ti";
import { usePostData } from "../../hooks/dataApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import LedgerName from "./LedgerName";

const JournalVoucher = () => {
  const [submitting, setSubmitting] = useState(false);

  const { mutateAsync } = usePostData();
  const { reset } = useForm({});

  const value = useGlobalContext();
  const { cartItems, setCartItems } = value;

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

  const DeleteCart = () => {
    value.deleteCartItems();
  };

  const onSubmit = async (cartItems) => {
    setSubmitting(true);
    var data = new FormData();
    data = { items: cartItems };

    try {
      const { status } = await mutateAsync({
        path: "/accountGl/journalCreate",
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        setCartItems([]);
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :", error.message);
      }
    } finally {
      // action();
      setSubmitting(false);
    }
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <JournalVoucherAdd />

      <div>
        <div className="flex flex-wrap items-center justify-between my-2">
          <TopHeader title="Voucher List" />
        </div>

        <div className="list-wrapper">
          <div className="md:grid grid-cols-6 list-header">
            <ListHeader label="Ledger Name" />
            <ListHeader label="Particulars" />
            <ListHeader label="Dr" className="flex justify-end" />
            <ListHeader label="Cr" className="flex justify-end" />
            <ListHeader label="" />
            <div className="flex justify-end">
              <button
                className="bg-red-600 text-white px-4 py-1 rounded-full hover:bg-red-500"
                onClick={DeleteCart}
              >
                Remove All
              </button>
            </div>
          </div>

          {cartItems.map((cartItem, index) => (
            <div key={index}>
              <div className="grid grid-cols-1 md:grid-cols-6 list-body">
                <LedgerName ledgerId={cartItem.ledgerId} />
                <ListCol
                  label="Voucher Number : "
                  value={cartItem.particulars}
                />

                <ListCol
                  className="flex justify-start md:justify-end"
                  label="Debit : "
                  value={cartItem.dr.toLocaleString("en-US")}
                />
                <ListCol
                  className="flex justify-start md:justify-end"
                  label="Credit : "
                  value={cartItem.cr.toLocaleString("en-US")}
                />
                <ListCol />
                <div className="flex justify-start md:justify-end">
                  <button
                    className="break-words cursor-pointer transition delay-100 text-2xl"
                    onClick={() => value.deleteCartItem(cartItem.trId)}
                  >
                    <TiDelete size={40} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {totalBalance}</span>
          </div>
        </div>
      </div>
      {cartItems.length > 0 && totalBalance === 0 && (
        <button
          onClick={() => onSubmit(cartItems)}
          className="bg-orange text-white px-4 py-1 rounded-md my-2"
        >
          Save
        </button>
      )}
    </div>
  );
};

export default JournalVoucher;
