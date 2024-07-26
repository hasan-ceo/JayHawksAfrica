import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import BorrowerVisitForm from "./BorrowerVisitForm";

const BorrowerVisitEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allObdBorrowerVisit", `/allObdBorrowerVisit/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Today’s OD follow up information "
        btn="Return"
        path={`/ops/visit/preview/${list.data.allVisitId}`}
      />
      <BorrowerVisitForm
        defaultValues={{
          obdBorrowerId: list.data.obdBorrowerId,
          allVisitId: list.data.allVisitId,
          groupName: list.data.groupName,
          borrowerName: list.data.borrowerName,
          overdueAmount: list.data.overdueAmount,
          loanBalance: list.data.loanBalance,
          collectedAmount: list.data.collectedAmount,
          takenAction: list.data.takenAction,
        }}
        action={refetch}
        btnText="Update"
        path="/allObdBorrowerVisit/update"
        returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
      />
    </div>
  );
};

export default BorrowerVisitEdit;
