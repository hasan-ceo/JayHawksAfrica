import React from "react";

import TopHeader from "../../components/TopHeader";
import PartyForm from "./PartyForm";

const PartyAdd = () => {
  const defaultValues = {
    partyId: "",
    partyName: "",
    email: "",
    contactNumber: "",
    address: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="পার্টি তৈরী করুন"
        btn="Return"
        path="/setup/party/list"
      />
      <PartyForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="সেভ"
        path="/parties/create"
        returnPath="/setup/party/list"
      />
    </div>
  );
};

export default PartyAdd;
