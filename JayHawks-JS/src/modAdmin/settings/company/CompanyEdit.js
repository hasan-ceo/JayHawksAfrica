import React from "react";
import TopHeader from "../../../components/TopHeader";
import CompanyForm from "./CompanyForm";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

const CompanyEdit = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrCompanyDetails", "/company/details");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Edit Company Profile" />
      <CompanyForm
        defaultValues={{
          companyId: list.data.companyId,
          companyName: list.data.companyName,
          companyAddress: list.data.companyAddress,
          mailServer: list.data.mailServer,
          mailPort: list.data.mailPort,
          mailAlias: list.data.mailAlias,
          mailUserName: list.data.mailUserName,
          mailPassword: list.data.mailPassword,
          nssfEmployee: list.data.nssfEmployee,
          nssfEmployer: list.data.nssfEmployer,
          googleDriveKey: list.data.googleDriveKey,
        }}
        action={refetch}
        btnText="Update"
        path="/company/update"
      />
    </div>
  );
};

export default CompanyEdit;
