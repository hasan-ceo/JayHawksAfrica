import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import CashAtHandBmForm from "./CashAtHandBmForm";

const CashAtHandBmEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allCashBalance", `/allCashBalance/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Cash in hand/Bank/M-Pesa balance"
        btn="Return"
        path={`/ops/visit/preview/${list.data.allVisitId}`}
      />
      {list.data.isSubmit === 1 && (
        <CashAtHandBmForm
          defaultValues={{
            cashBalanceId: list.data.cashBalanceId,
            workToBeDone: list.data.workToBeDone,
            status: list.data.status,
            identifiedMajor: list.data.identifiedMajor,
            takenSteps: list.data.takenSteps,
            bmComments: list.data.bmComments,
          }}
          action={refetch}
          btnText="Update"
          path="/allCashBalance/updateByBm"
          returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
        />
      )}
    </div>
  );
};

export default CashAtHandBmEdit;
