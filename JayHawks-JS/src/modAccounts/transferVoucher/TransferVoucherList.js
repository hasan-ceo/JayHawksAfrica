import React from "react";
import DeleteButton from "../../components/button/DeleteButton";
import TopHeader from "../../components/TopHeader";
import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";

const TransferVoucherList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("transferVoucher", "/transferVoucher/list");

  const data = [
    {
      transferVoucherId: "111",
      transactionType: "11",
      bank: "Dhaka",
      amount: "11",
      particulars: "Dhaka",
    },
  ];

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Receive Voucher"
        btn="Save"
        path={"/ac/transferVoucher/add"}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Transaction Type " />
          <ListHeader label="Cash/Bank" />
          <ListHeader label="Amount" />
          <ListHeader label="Particulars" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.transferVoucherId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol
                label="Transaction Type : "
                value={item.transactionType}
              />
              <ListCol label="Cash/Bank : " value={item.bank} />
              <ListCol label="Amount : " value={item.amount} />
              <ListCol label="Particulars : " value={item.particulars} />
              <div className="flex justify-end space-x-2">
                <DeleteButton
                  action={refetch}
                  path={`/transferVoucher/delete/${item.transferVoucherId}`}
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

export default TransferVoucherList;
