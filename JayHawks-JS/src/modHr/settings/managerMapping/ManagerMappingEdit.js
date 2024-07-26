import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";

import ResignReasonsForm from "./ManagerMappingForm";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const ManagerMappingEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("managerMappingDetails", `/managerMapping/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Resign Reasons"
        btn="Return"
        path="/hr/settings/manager-mapping/list"
      />
      <ResignReasonsForm
        defaultValues={{
          mgtMappingId: list.data.mgtMappingId,
          designationId: list.data.designationId,
          mappedTo: list.data.mappedTo,
        }}
        action={refetch}
        btnText="Update"
        path="/managerMapping/update"
        returnPath="/hr/settings/manager-mapping/list"
      />
    </div>
  );
};

export default ManagerMappingEdit;
