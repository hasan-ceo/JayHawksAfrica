import React from "react";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import { format } from "date-fns";
import NoteButton from "../../components/button/NoteButton";
import PreviewButton from "../../components/button/PreviewButton";

const CloseList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("auditcreation", "/auditcreation/closeByUser");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Close Audit List" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="Audit Name" />
          <ListHeader label="Branch Name" />
          <ListHeader label="Branch opening date" />
          <ListHeader label="Audit start Date" />
          <ListHeader label="Audit end Date" />
          <ListHeader label="Period under Audit" />
          <ListHeader label="Last audit period" />

          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.auditId}
              className="grid grid-cols-1 md:grid-cols-8 list-body"
            >
              <ListCol label="Audit Name:" value={item.auditName} />
              <ListCol label="Branch Name:" value={item.branchName} />
              <ListCol
                label="Branch opening Date:"
                value={format(new Date(item.startDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Audit start Date:"
                value={format(new Date(item.auditStartDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Audit end Date:"
                value={format(new Date(item.auditEndDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Period under Audit:"
                value={item.periodUnderAudit}
              />

              <ListCol
                label="Total Loan portfolio amount:"
                value={item.totalLoanPortfolio}
              />
              <div>
                <div className="flex justify-end space-x-2">
                  <PreviewButton path={`/audit/preview/${item.auditId}`} />
                  <NoteButton
                    path={`/audit/closeObservations/${item.auditId}`}
                  />
                </div>
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

export default CloseList;
