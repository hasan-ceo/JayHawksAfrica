import React from "react";
import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import TextButton from "../../components/button/TextButton";
import { format } from "date-fns";
import DeleteButton from "../../components/button/DeleteButton";

const ExpenseVoucherList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("expenseVoucher", "/accountGl/expenseList");
  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;

  let sumDeposit = 0;
  let sumWithdraw = 0;

  if (data.length > 0) {
    sumDeposit = data.map((item) => item.dr).reduce((sum, val) => sum + val, 0);
    sumWithdraw = data
      .map((item) => item.cr)
      .reduce((sum, val) => sum + val, 0);
  }

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
          Expense Voucher List
        </h1>
        <div className="flex justify-end space-x-2">
          <TextButton path="/ac/expenseVoucher/byBank" title="By Bank" />
          <TextButton path="/ac/expenseVoucher/byCash" title="By Cash" />
        </div>
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-10 list-header">
          <ListHeader label="Date" />
          <ListHeader label="Voucher Type" />
          <ListHeader label="Voucher Number" />
          <ListHeader label="Trans Type" />
          <ListHeader label="Particulars" />
          <ListHeader label="Status" />
          <ListHeader label="Ledger Name" />
          <ListHeader label="Debit" className="flex justify-end" />
          <ListHeader label="Credit" className="flex justify-end" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-10 list-body">
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
                label="Debit : "
                value={item.dr.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Credit : "
                value={item.cr.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <div className="flex justify-end space-x-2">
                <DeleteButton
                  action={refetch}
                  path={`/accountGl/delete/${item.glId}`}
                />
              </div>
            </div>
          ))}

        <div className="list-footer font-bold grid grid-cols-1 md:grid-cols-10">
          <div className="md:col-span-7 flex items-center">
            <span>Total Transactions: {list.data.length}</span>
          </div>
          <div className="md:col-span-1 flex justify-end">
            <span> {sumDeposit.toLocaleString("en-US")}</span>
          </div>
          <div className="md:col-span-1 flex justify-end">
            <span> {sumWithdraw.toLocaleString("en-US")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseVoucherList;
