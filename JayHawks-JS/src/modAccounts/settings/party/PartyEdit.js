import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import PartyForm from "./PartyForm";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const PartyEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("party", `/parties/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Party"
        btn="Return"
        path="/ac/settings/party/list"
      />
      <PartyForm
        defaultValues={{
          partyId: list.data.partyId,
          partyName: list.data.partyName,
          email: list.data.email,
          contactNumber: list.data.contactNumber,
          contactAddress: list.data.contactAddress,
        }}
        action={refetch}
        btnText="Update"
        path="/parties/update"
        returnPath="/ac/settings/party/list"
      />
    </div>
  );
};

export default PartyEdit;
