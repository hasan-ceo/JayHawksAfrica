import React from "react";
import DeleteButton from "../../components/button/DeleteButton";
import TopHeader from "../../components/TopHeader";
import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";

const PaymentVoucherList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("paymentVoucher", "/paymentVoucher/list");

  const data = [
    {
      paymentVoucherId: "111",
      amount: "11",
      particulars: "Dhaka",
      cashOrBank: "11",
      accountHead: "Dhaka",
    },
  ];

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Payment Voucher"
        btn="Save"
        path={"/ac/paymentVoucher/add"}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Cash/Bank" />
          <ListHeader label="AccountHead" />
          <ListHeader label="Amount" />
          <ListHeader label="Particulars" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.paymentVoucherId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label="Cash/Bank : " value={item.cashOrBank} />
              <ListCol label="AccountHead : " value={item.accountHead} />
              <ListCol label="Amount : " value={item.amount} />
              <ListCol label="Particulars : " value={item.particulars} />
              <div className="flex justify-end space-x-2">
                <DeleteButton
                  action={refetch}
                  path={`/paymentVoucher/delete/${item.paymentVoucherId}`}
                />
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentVoucherList;
