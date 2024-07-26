import React from "react";
import { useParams } from "react-router-dom";
import DetailsList from "./DetailsList";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import Transfer from "../../../../modHr/reports/employee/Transfer";
import Promotion from "../../../../modHr/reports/employee/Promotion";

const Details = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("hrreportsdetailsbyid", `/hrreports/detailsbyid/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl gap-5">
      <DetailsList employee={list.data.employee} />
      <Transfer transfer={list.data.transfer} />
      <Promotion promotion={list.data.promotion} />
    </div>
  );
};

export default Details;
