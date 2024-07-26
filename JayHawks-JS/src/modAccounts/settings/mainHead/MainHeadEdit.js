import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import MainHeadForm from "./MainHeadForm";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";

const MainHeadEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("mainhead", `/mainhead/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Account Main Head"
        btn="Return"
        path="/ac/settings/mainhead/list"
      />
      <MainHeadForm
        defaultValues={{
          mainHeadId: list.data.mainHeadId,
          accountType: list.data.accountType,
          mainHeadName: list.data.mainHeadName,
        }}
        action={refetch}
        btnText="Update"
        path="/mainhead/update"
        returnPath="/ac/settings/mainhead/list"
      />
    </div>
  );
};

export default MainHeadEdit;
