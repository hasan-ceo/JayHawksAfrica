import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import {
  ListCol,
  ListHeader,
} from "../../../../../components/ListColWithHeader";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import EditButton from "../../../../../components/button/EditButton";
import DeleteButton from "../../../../../components/button/DeleteButton";

const BorrowerVisitList = ({ id, isSubmit, isBm, isManager }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allObdBorrowerVisitlist", `/allObdBorrowerVisit/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <TopHeader
        title="3.	Overdue & Bad debt borrowersVisit (at least 5 default borrowers in each visit):"
        btn={isSubmit === 0 ? "Save" : ""}
        path={`/ops/allVisit/borrowerVisit/add/${id}`}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-12 list-header">
          <ListHeader label="Group Name" />
          <ListHeader label="Borrower’s Name" />
          <ListHeader label="Overdue amount" />
          <ListHeader label="Loan amount" />
          <ListHeader label="Amount collected" />
          <ListHeader label="Taken Action" className=" md:col-span-2 md:pr-2" />
          <ListHeader className="md:col-span-2 md:pr-2" label="BM Comments" />
          <ListHeader className="md:col-span-2 " label="Supervisor Comments" />

          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 list-body"
            >
              <ListCol label="Group Name " value={item.groupName} />
              <ListCol label="Borrower Name" value={item.borrowerName} />
              <ListCol
                label="Overdue Amount"
                value={item.overdueAmount.toLocaleString()}
              />
              <ListCol
                label="Loan Balance"
                value={item.loanBalance.toLocaleString()}
              />
              <ListCol
                label="Collected Amount"
                value={item.collectedAmount.toLocaleString()}
              />
              <ListCol
                className=" md:col-span-2 md:pr-2"
                label="Taken Action"
                value={item.takenAction}
              />
              <ListCol
                className="md:col-span-2 md:pr-2"
                label="Comments Of BM"
                value={item.bmComments}
              />
              <ListCol
                className="md:col-span-2"
                label="Comments Of Supervisor"
                value={item.supervisorComments}
              />
              {isSubmit === 0 && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/allVisit/borrowerVisit/edit/${item.obdBorrowerId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/allObdBorrowerVisit/delete/${item.obdBorrowerId}`}
                  />
                </div>
              )}
              {isSubmit === 1 && isBm === true && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/allVisit/borrowerVisit/bm/edit/${item.obdBorrowerId}`}
                  />
                </div>
              )}
              {isSubmit === 1 && isManager === true && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/allVisit/borrowerVisit/supervisor/edit/${item.obdBorrowerId}`}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BorrowerVisitList;
