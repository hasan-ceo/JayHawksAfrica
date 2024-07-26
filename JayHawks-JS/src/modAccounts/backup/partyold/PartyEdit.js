import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";

import PartyForm from "./PartyForm";

const PartyEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("partiesDetails", `/parties/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="পার্টি Update করুন"
        btn="Return"
        path="/setup/party/list"
      />
      <PartyForm
        defaultValues={{
          partyId: list.data.partyId,
          partyName: list.data.partyName,
          email: list.data.email,
          contactNumber: list.data.contactNumber,
          address: list.data.address,
        }}
        action={refetch}
        btnText="Update"
        path="/parties/update"
        returnPath="/setup/party/list"
      />
    </div>
  );
};

export default PartyEdit;
