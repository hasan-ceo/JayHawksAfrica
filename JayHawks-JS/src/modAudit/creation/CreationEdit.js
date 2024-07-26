import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import CreationForm from "./CreationForm";

const CreationEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrCreation", `/creations/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Creation"
        btn="Return"
        path="/hr/settings/creation/list"
      />
      <CreationForm
        defaultValues={{
          creationId: list.data.creationId,
          creationName: list.data.creationName,
        }}
        action={refetch}
        btnText="Update"
        path="/creations/update"
        returnPath="/hr/settings/creation/list"
      />
    </div>
  );
};

export default CreationEdit;
