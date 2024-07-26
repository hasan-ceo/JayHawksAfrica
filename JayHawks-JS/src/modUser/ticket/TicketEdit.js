import React from "react";
import { useParams } from "react-router-dom";
import TicketForm from "./TicketForm";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";

const TicketEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrticketdetails", `/ticket/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  console.log(list.data);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Edit Issue" btn="Return" path="/ticket/list" />
      <TicketForm
        defaultValues={{
          ticketId: list.data.ticketId,
          categoryId: list.data.categoryId,
          ticketType: list.data.ticketType,
          title: list.data.title,
          description: list.data.description,
          priority: list.data.priority,
        }}
        action={refetch}
        btnText="Update"
        path="/ticket/update"
        returnPath="/ticket/list"
      />
    </div>
  );
};

export default TicketEdit;
