import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import PortfolioAnalysisForm from "./PortfolioAnalysisForm";

const PortfolioAnalysisListEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "allPortfolioAnalysisdetails",
    `/allPortfolioAnalysis/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit portfolio analysis "
        btn="Return"
        path={`/ops/visit/preview/${list.data.allVisitId}`}
      />
      <PortfolioAnalysisForm
        defaultValues={{
          analysisId: list.data.analysisId,
          allVisitId: list.data.allVisitId,
          employeeId: list.data.employeeId,
          borrowerMicroLoan: list.data.borrowerMicroLoan,
          borrowerSbl: list.data.borrowerSbl,
          borrowerTotal: list.data.borrowerTotal,
          loiMicroLoan: list.data.loiMicroLoan,
          loiSbl: list.data.loiSbl,
          loiTotal: list.data.loiTotal,
          borrowerTarget: list.data.borrowerTarget,
          shortageNoOfBorrower: list.data.shortageNoOfBorrower,
          overdueNo: list.data.overdueNo,
          overdueAmount: list.data.overdueAmount,
          overdueInDeNo: list.data.overdueInDeNo,
          overdueInDeAmount: list.data.overdueInDeAmount,
        }}
        action={refetch}
        btnText="Update"
        path="/allPortfolioAnalysis/update"
        returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
      />
    </div>
  );
};

export default PortfolioAnalysisListEdit;
