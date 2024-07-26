import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import BankForm from "./BankForm";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";

const BankEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("banks", `/accounts/banks/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Banks Update"
        btn="Return"
        path="/accounts/banks/list"
      />

      <BankForm
        defaultValues={{
          id: list.data.id,
          name: list.data.name,
          accountNumber: list.data.accountNumber,
          currency: list.data.currency,
          address: list.data.address,
        }}
        action={refetch}
        btnText="Update"
        path="/accounts/banks/update"
        returnPath="/accounts/banks/list"
      />
    </div>
  );
};

export default BankEdit;
