import React from "react";
import TopHeader from "../../components/TopHeader";
import BankForm from "./BankForm";

const BankAdd = () => {
  const defaultValues = {
    name: "",
    accountNumber: "",
    currency: "",
    address: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Banks Create"
        btn="Return"
        path="/accounts/banks/list"
      />
      <BankForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/accounts/banks/create"
        returnPath="/accounts/banks/list"
      />
    </div>
  );
};

export default BankAdd;
