import React, { useState } from "react";
import Error from "../../../../components/Error";
import { ListCol, ListHeader } from "../../../../components/ListColWithHeader";
import { HashLoading } from "../../../../components/Loading";
import PrintHeader from "../../../../components/PrintHeader";
import { useGetData } from "../../../../hooks/dataApi";
import { format } from "date-fns";
import PdfButton from "../../../../components/button/PdfButton";

const DayBookList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "mfDayBookReport",
    `/acDayBook/new/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (
        item.ledgerName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })

    .map(({ ledgerName, particulars, dr, cr }) => ({
      ledgerName,
      particulars,
      dr,
      cr,
    }));

  // const filteredData = list.data.filter((item) => {
  //   if (query === "") {
  //     return true;
  //   } else {
  //     return item.ledgerName.toLowerCase().includes(query.toLowerCase());
  //   }
  // });

  let sumDeposit = 0;
  let sumWithdraw = 0;

  if (data.length > 0) {
    sumDeposit = data.map((item) => item.dr).reduce((sum, val) => sum + val, 0);
    sumWithdraw = data
      .map((item) => item.cr)
      .reduce((sum, val) => sum + val, 0);
  }



  return (
    <>
      <div className="flex justify-end">
        <PrintHeader fileName="daybook.csv" data={list.data} />
        <PdfButton
          path={`/acReportPdf/new/${dataForm.fromDate}/${dataForm.tillDate}`}
          filename="DayBook.pdf"
        />
      </div>

      <div className="list-wrapper">
        <div className="md:grid grid-cols-7 list-header">
          <ListHeader label="Date" />
          <ListHeader label="Voucher Number" />
          <ListHeader label="Ledger Name" />
          <ListHeader label="Sub Ledger Name" />
          <ListHeader label="Particulars" />
          <ListHeader label="Debit Amount" className="flex justify-end" />
          <ListHeader label="Credit Amount" className="flex justify-end" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-7 list-body"
            >
              <ListCol
                label="Date :"
                value={format(new Date(item.workDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Voucher Number :" value={item.voucherNumber} />
              <ListCol label="Ledger Name :" value={item.ledgerName} />
              <ListCol label="Sub Ledger Name :" value={item.subLedgerName} />
              <ListCol label="Particulars :" value={item.particulars} />
              <ListCol
                label="Debit Amount"
                value={item.dr.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Credit Amount :"
                value={item.cr.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
            </div>
          ))}

        <div className="list-footer font-bold grid grid-cols-1 md:grid-cols-8">
          <div className="md:col-span-6 flex items-center">
            <span>Total</span>
            <ListCol value={`Transactions : ${data.length} `} />
          </div>
          <div className="md:col-span-1 flex justify-end">
            <ListCol
              label="Total Debit :"
              value={sumDeposit.toLocaleString("en-US")}
              className="flex justify-end"
            />
          </div>
          <div className="md:col-span-1 flex justify-end">
            <ListCol
              label="Total Credit :"
              value={sumWithdraw.toLocaleString("en-US")}
              className="flex justify-end"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DayBookList;
