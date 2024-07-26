import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import ObservationsForm from "./ObservationsForm";

const ObservationsAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    observationsId: "",
    auditId: id,
    auditArea: "",
    details: "",
    rootCause: "",
    riskRating: "",
    riskImplication: "",
    recommendations: "",
    attachment: "",
    // attachment:
    //   "https://drive.google.com/file/d/1QuEA6d78wCu6QYdbyV6z4LX0xJE_fqmy/view?usp=drivesdk",
    // managementComments: "",
    // issueOwner: "",
    // actionDate: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Audit Observations"
        btn="Return"
        path={`/audit/observations/${id}`}
      />
      <ObservationsForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditObservations/create"
        returnPath={`/audit/observations/${id}`}
      />
    </div>
  );
};

export default ObservationsAdd;
