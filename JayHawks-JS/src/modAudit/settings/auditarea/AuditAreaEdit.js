import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import AuditAreaForm from "./AuditAreaForm";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

const AuditAreaEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrAuditArea", `/auditAreas/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Audit Area"
        btn="Return"
        path="/audit/settings/area/list"
      />
      <AuditAreaForm
        defaultValues={{
          auditAreaId: list.data.auditAreaId,
          auditAreaName: list.data.auditAreaName,
        }}
        action={refetch}
        btnText="Update"
        path="/auditAreas/update"
        returnPath="/audit/settings/area/list"
      />
    </div>
  );
};

export default AuditAreaEdit;
