import React from "react";
import DeleteButton from "../../components/button/DeleteButton";
import TopHeader from "../../components/TopHeader";
import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";

const LedgerList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("journalVoucher", "/journalVoucher/list");

  const data = [
    {
      journalVoucherId: "111",
      amount: "11",
      particulars: "Dhaka",
      accountHeadDr: "11",
      accountHeadCr: "Dhaka",
    },
  ];

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Journal Voucher"
        btn="Save"
        path={"/ac/journalVoucher/add"}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="AccountHeadDr" />
          <ListHeader label="AccountHeadCr" />
          <ListHeader label="Amount" />
          <ListHeader label="Particulars" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.journalVoucherId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label="AccountHeadDr : " value={item.accountHeadDr} />
              <ListCol label="AccountHeadCr : " value={item.accountHeadCr} />
              <ListCol label="Amount : " value={item.amount} />
              <ListCol label="Particulars : " value={item.particulars} />
              <div className="flex justify-end space-x-2">
                <DeleteButton
                  action={refetch}
                  path={`/journalVoucher/delete/${item.journalVoucherId}`}
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

export default LedgerList;
