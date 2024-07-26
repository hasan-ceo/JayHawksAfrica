import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import SchedulingForm from "./SchedulingForm";

const SchedulingEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrScheduling", `/creations/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Scheduling"
        btn="Return"
        path="/hr/settings/creation/list"
      />
      <SchedulingForm
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

export default SchedulingEdit;
