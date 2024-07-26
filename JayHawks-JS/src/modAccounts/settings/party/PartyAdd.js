import React from "react";
import TopHeader from "../../../components/TopHeader";
import PartyForm from "./PartyForm";

const PartyAdd = () => {
  const defaultValues = {
    partyName: "",
    email: "",
    contactNumber: "",
    contactAddress: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Party"
        btn="Return"
        path="/ac/settings/party/list"
      />
      <PartyForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/parties/create"
        returnPath="/ac/settings/party/list"
      />
    </div>
  );
};

export default PartyAdd;
