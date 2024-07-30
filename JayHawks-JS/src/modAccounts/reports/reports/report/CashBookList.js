import React, { useState } from "react";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import { ListCol, ListHeader } from "../../../../components/ListColWithHeader";
import PrintHeader from "../../../../components/PrintHeader";
import { format } from "date-fns";
import PdfButton from "../../../../components/button/PdfButton";

const CashBookList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "AcCashBook",
    `/acCashBook/new/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const filteredData = list.data.filter((item) => {
    if (query === "") {
      return true;
    } else {
      return item.ledgerName.toLowerCase().includes(query.toLowerCase());
    }
  });

  const dataWithIndividualBalance = filteredData.map((item) => {
    const balance = item.dr - item.cr;
    return {
      ...item,
      balance,
    };
  });

  const totalDebit = dataWithIndividualBalance.reduce((acc, item) => {
    return acc + item.dr;
  }, 0);

  const totalCredit = dataWithIndividualBalance.reduce((acc, item) => {
    return acc + item.cr;
  }, 0);

  const totalBalance = dataWithIndividualBalance.reduce((acc, item) => {
    return acc + item.balance;
  }, 0);


  return (
    <>
      <div className="flex justify-end">
        <PrintHeader
          title=""
          fileName="CashBook.csv"
          data={dataWithIndividualBalance}
        />
        <PdfButton
          path={`/acReportPdf/cashBook/${dataForm.fromDate}/${dataForm.tillDate}`}
          filename="cashbook.pdf"
        />
      </div>

      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label=" Date " />
          <ListHeader label="Particulars" />
          <ListHeader className="text-right" label="Debit Amount" />
          <ListHeader className="text-right" label="Credit Amount" />
          <ListHeader className="text-right" label="Balance" />
        </div>
        {dataWithIndividualBalance.length > 0 &&
          dataWithIndividualBalance.map((item) => (
            <div
              key={item.glId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol
                label="Date : "
                value={format(new Date(item.workDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Particular :" value={item.ledgerName} />
              <ListCol
                className="text-right"
                label="Debit Amount:"
                value={item.dr.toLocaleString("en-US")}
              />
              <ListCol
                className="text-right"
                label="Credit Amount:"
                value={item.cr.toLocaleString("en-US")}
              />
              <ListCol
                className="text-right"
                label="Balance:"
                value={item.balance.toLocaleString("en-US")}
              />

              <div className="flex justify-end space-x-2"></div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-4"></div>
          <div className="grid grid-cols-5 justify-items-end">
            <span className="font-semibold"></span>
            <span className="font-semibold"></span>
            <span className="font-semibold">Total Debit: {totalDebit}</span>
            <span className="font-semibold">Total Credit: {totalCredit}</span>
            <span className="font-semibold">Total Balance: {totalBalance}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashBookList;
