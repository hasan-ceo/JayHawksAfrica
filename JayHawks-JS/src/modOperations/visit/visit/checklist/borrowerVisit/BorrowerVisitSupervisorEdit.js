import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import BorrowerVisitSupervisorForm from "./BorrowerVisitSupervisorForm";

const BorrowerVisitSupervisorEdit = () => {
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
        title="Edit Overdue & Bad debt borrowers Visit"
        btn="Return"
        path={`/ops/visit/preview/${list.data.allVisitId}`}
      />

      {list.data.isSubmit === 1 && (
        <BorrowerVisitSupervisorForm
          defaultValues={{
            obdBorrowerId: list.data.obdBorrowerId,
            groupName: list.data.groupName,
            borrowerName: list.data.borrowerName,
            overdueAmount: list.data.overdueAmount,
            loanBalance: list.data.loanBalance,
            collectedAmount: list.data.collectedAmount,
            takenAction: list.data.takenAction,
            bmComments: list.data.bmComments,
            supervisorComments: list.data.supervisorComments,
          }}
          action={refetch}
          btnText="Update"
          path="/allObdBorrowerVisit/updateBySupervisor"
          returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
        />
      )}
    </div>
  );
};

export default BorrowerVisitSupervisorEdit;
