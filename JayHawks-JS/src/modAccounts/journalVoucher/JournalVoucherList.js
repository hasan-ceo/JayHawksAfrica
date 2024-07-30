import React from "react";
import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import { format } from "date-fns";
import TopHeader from "../../components/TopHeader";

const JournalVoucherList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("JournalVoucher", "/accountGl/journalList");
  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;
  let sumDeposit = 0;
  let sumWithdraw = 0;

  if (list.data.length > 0) {
    sumDeposit = list.data.map((item) => item.dr).reduce((sum, val) => sum + val, 0);
    sumWithdraw = list.data
      .map((item) => item.cr)
      .reduce((sum, val) => sum + val, 0);
  }
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Journal Voucher"
        btn="Save"
        path={"/ac/journalVoucher/add"}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-9 list-header">
          <ListHeader label="Date" />
          <ListHeader label="Voucher Type" />
          <ListHeader label="Voucher Number" />
          <ListHeader label="Trans Type" />
          <ListHeader label="Particulars" />
          <ListHeader label="Status" />
          <ListHeader label="Ledger Name" />
          <ListHeader label="Debit" className="flex justify-end" />
          <ListHeader label="Credit" className="flex justify-end" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-9 list-body">
              <ListCol
                label="Date : "
                value={format(new Date(item.workDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Voucher Type : " value={item.voucherType} />
              <ListCol label="Voucher Number : " value={item.voucherNumber} />
              <ListCol label="Trans Type : " value={item.transType} />
              <ListCol label="Particulars : " value={item.particulars} />
              <ListCol
                label="Status : "
                value={item.isReverse === true ? "Reverse" : ""}
              />
              <ListCol label="Ledger Name : " value={item.ledgerName} />
              <ListCol
                className="flex justify-start md:justify-end"
                label="Debit : "
                value={item.dr.toLocaleString("en-US")}
              />
              <ListCol
                className="flex justify-start md:justify-end"
                label="Credit : "
                value={item.cr.toLocaleString("en-US")}
              />
            </div>
          ))}

        {/* <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div> */}
        <div className="list-footer font-bold">
          <div className="grid grid-cols-1 md:grid-cols-9">
            <ListCol
              label="Total Debit :  "
              value={`Total ${list.data.length} Transactions`}
            />
            <ListCol />
            <ListCol />
            <ListCol />
            <ListCol />
            <ListCol />
            <ListCol />
            <ListCol
              label="Total  :  "
              value={`Total :${sumDeposit.toLocaleString("en-US")}`}
              className="flex justify-start md:justify-end"
            />
            <ListCol
              label="Total  :  "
              value={`Total : ${sumWithdraw.toLocaleString("en-US")}`}
              className="flex justify-start md:justify-end"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalVoucherList;
