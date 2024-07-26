import React from "react";
import TicketForm from "./TicketForm";
import TopHeader from "../../components/TopHeader";

const TicketAdd = () => {
  const defaultValues = {
    ticketId: "",
    categoryId: "",
    ticketType: "",
    priority: "",
    title: "",
    description: "",
    status: "",
    createdBy: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="My Ticket " btn="Return" path="/ticket/list" />
      <TicketForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/ticket/create"
        returnPath="/ticket/list"
      />
    </div>
  );
};

export default TicketAdd;
