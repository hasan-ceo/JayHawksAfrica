import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import CashAtHandForm from "./CashAtHandForm";

const CashAtHandEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allCashBalancedetails", `/allCashBalance/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Cash In Hand/Bank/M-Pesa Balance "
        btn="Return"
        path={`/ops/visit/preview/${list.data.allVisitId}`}
      />
      <CashAtHandForm
        defaultValues={{
          cashBalanceId: list.data.cashBalanceId,
          workToBeDone: list.data.workToBeDone,
          status: list.data.status,
          identifiedMajor: list.data.identifiedMajor,
          takenSteps: list.data.takenSteps,
        }}
        action={refetch}
        btnText="Update"
        path="/allCashBalance/update"
        returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
      />
    </div>
  );
};

export default CashAtHandEdit;
