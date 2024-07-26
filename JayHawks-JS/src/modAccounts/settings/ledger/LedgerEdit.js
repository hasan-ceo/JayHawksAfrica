import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import LedgerForm from "./LedgerForm";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";

const LedgerEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("ledgerdetails", `/ledger/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Ledger"
        btn="Return"
        path="/ac/settings/ledger/list"
      />
      <LedgerForm
        defaultValues={{
          ledgerId: list.data.ledgerId,
          ledgerName: list.data.ledgerName,
          subHeadId: list.data.subHeadId,
          descriptions: list.data.descriptions,
          locationId: list.data.locationId,
          projectId: list.data.projectId,
          isActive: list.data.isActive,
        }}
        action={refetch}
        btnText="Update"
        path="/ledger/update"
        returnPath="/ac/settings/ledger/list"
      />
    </div>
  );
};

export default LedgerEdit;
