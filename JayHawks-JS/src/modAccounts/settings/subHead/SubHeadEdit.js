import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import SubHeadForm from "./SubHeadForm";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";

const SubHeadEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("subheaddetails", `/subhead/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Account Sub Head"
        btn="Return"
        path="/ac/settings/subhead/list"
      />
      <SubHeadForm
        defaultValues={{
          subHeadId: list.data.subHeadId,
          mainHeadId: list.data.mainHeadId,
          subHeadName: list.data.subHeadName,
        }}
        action={refetch}
        btnText="Update"
        path="/subhead/update"
        returnPath="/ac/settings/subhead/list"
      />
    </div>
  );
};

export default SubHeadEdit;
