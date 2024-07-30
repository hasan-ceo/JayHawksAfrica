import React from "react";
import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import TextButton from "../../components/button/TextButton";
import { format } from "date-fns";

const TransferVoucherList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("transferVoucher", "/accountGl/transferList");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex  justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
          Transfer Voucher List
        </h1>
        <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <TextButton
              path="/ac/transferVoucher/BankToBank"
              title="Bank To Bank"
            />
          </div>
          <div className="">
            <TextButton
              path="/ac/transferVoucher/BankToCash"
              title="Bank To Cash"
            />
          </div>
          <div>
            {" "}
            <TextButton
              path="/ac/transferVoucher/CashToBank"
              title="Cash To Bank"
            />
          </div>
          <div className="">
            <TextButton
              path="/ac/transferVoucher/CashToCash"
              title="Cash To Cash"
            />
          </div>
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
          list.data.map((item) => (
            <div
              key={item.trnsId}
              className="grid grid-cols-1 md:grid-cols-10 list-body"
            >
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
                value={item.dr}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Credit : "
                value={item.cr}
                className="flex justify-start md:justify-end"
              />
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
