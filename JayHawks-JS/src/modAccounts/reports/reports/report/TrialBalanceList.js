import React, { useState } from "react";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import { ListCol, ListHeader } from "../../../../components/ListColWithHeader";
import PrintHeader from "../../../../components/PrintHeader";
import PdfButton from "../../../../components/button/PdfButton";

const TrialBalanceList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "AcTrialBalance",
    `/acTrialBalance/new/${dataForm.fromDate}/${dataForm.tillDate}`
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



  return (
    <>
      <div className="flex justify-end">
        <PrintHeader
          fileName="TrailBalance.csv"
          data={dataWithIndividualBalance}
        />
        <PdfButton
          path={`/acReportPdf/trialBalance/${dataForm.fromDate}/${dataForm.tillDate}`}
          filename="trailBalance.pdf"
        />
      </div>

      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Ledger Name" />

          <ListHeader label="Debit Amount" className="flex justify-end" />
          <ListHeader label="Credit Amount" className="flex justify-end" />
        </div>
        {dataWithIndividualBalance.length > 0 &&
          dataWithIndividualBalance.map((item) => (
            <div
              key={item.glId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol label="Ledger Name :" value={item.ledgerName} />
              <ListCol
                className="flex justify-start md:justify-end"
                label="Debit Amount:"
                value={item.dr.toLocaleString("en-US")}
              />
              <ListCol
                className="flex justify-start md:justify-end"
                label="Credit Amount:"
                value={item.cr.toLocaleString("en-US")}
              />
              <div className="flex justify-end space-x-2"></div>
            </div>
          ))}

        <div className="list-footer font-bold">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <ListCol
              label="Transactions :  "
              value={`Total ${filteredData.length} Transactions`}
            />
            <ListCol
              label="Total Debit :  "
              value={totalDebit.toLocaleString("en-US")}
              className="flex justify-start md:justify-end"
            />
            <ListCol
              label="Total Credit :  "
              value={totalCredit.toLocaleString("en-US")}
              className="flex justify-start md:justify-end"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrialBalanceList;
