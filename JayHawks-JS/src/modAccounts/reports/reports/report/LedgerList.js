import React, { useState } from "react";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import { ListCol, ListHeader } from "../../../../components/ListColWithHeader";
import TopHeader from "../../../../components/TopHeader";
import OpeningBalance from "./OpeningBalance";
import PrintHeader from "../../../../components/PrintHeader";
import PdfButton from "../../../../components/button/PdfButton";
import { format } from "date-fns";

const LedgerList = ({ dataForm }) => {
  const [query, setQuery] = useState("");

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "acLedgerReport",
    `/acLedgerReport/ledgerName/${dataForm.searchId}/${dataForm.fromDate}/${dataForm.tillDate}`
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
    .map(({ workDate, ledgerName, particulars, dr, cr }) => ({
      workDate,
      ledgerName,
      particulars,
      dr,
      cr,
    }));

  let sumDeposit = 0;
  let sumWithdraw = 0;
  let balance = 0;

  if (data.length > 0) {
    sumDeposit = data.map((item) => item.dr).reduce((sum, val) => sum + val, 0);
    sumWithdraw = data
      .map((item) => item.cr)
      .reduce((sum, val) => sum + val, 0);
  }

  balance = sumDeposit - sumWithdraw;


  const ledgerName = list?.data[0]?.ledgerName;

  return (
    <>
      {list.data.length > 0 ? (
        <TopHeader title={ledgerName} />
      ) : (
        <TopHeader title={"No data found for this ledger"} />
      )}
      <div className="flex justify-end">
        <PrintHeader fileName="ledgerReport.csv" data={list.data} />
        <PdfButton
          path={`/acReportPdf/ledgerName/${dataForm.searchId}/${dataForm.fromDate}/${dataForm.tillDate}`}
          filename="ledgerReport.pdf"
        />
      </div>

      <div className="list-wrapper">
        <div className="flex justify-end">
          <OpeningBalance
            ledgerId={dataForm.searchId}
            fromDate={dataForm.fromDate}
          />
        </div>
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Date" />
          <ListHeader label="Particulars" />
          <ListHeader label="Voucher No" />
          <ListHeader label="Debit Amount" className="flex justify-end" />
          <ListHeader label="Credit Amount" className="flex justify-end" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-5 list-body">
              <ListCol
                label="Date :"
                value={format(new Date(item.workDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Particulars :" value={item.particulars} />
              <ListCol label="Voucher No :" value={item.voucherNumber} />
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
              <div className="flex justify-end space-x-2"></div>
            </div>
          ))}

        <div className="list-footer font-bold grid grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-3">
            <ListCol
              label="Total Transactions :"
              value={`Total ${data.length} Transactions`}
            />
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
        <div className="flex justify-end font-bold mt-4">
          <h5>Total Balance :</h5>
          <ListCol
            value={balance.toLocaleString("en-US")}
            className="flex justify-end"
          />
        </div>
      </div>
    </>
  );
};

export default LedgerList;
