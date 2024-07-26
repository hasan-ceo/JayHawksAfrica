import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import PortfolioAnalysisForm from "./PortfolioAnalysisForm";
import { useParams } from "react-router-dom";

const PortfolioAnalysisListAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    analysisId: 0,
    allVisitId: id,
    employeeId: "",
    borrowerMicroLoan: 0,
    borrowerSbl: 0,
    borrowerTotal: 0,
    loiMicroLoan: 0,
    loiSbl: 0,
    loiTotal: 0,
    borrowerTarget: 0,
    shortageNoOfBorrower: 0,
    overdueNo: 0,
    overdueAmount: 0,
    overdueInDeNo: 0,
    overdueInDeAmount: 0,
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="1.	Portfolio Analysis Add"
        btn="Return"
        path={`/ops/visit/preview/${id}`}
      />
      <PortfolioAnalysisForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/allPortfolioAnalysis/create"
        returnPath={`/ops/visit/preview/${id}`}
      />
    </div>
  );
};

export default PortfolioAnalysisListAdd;
