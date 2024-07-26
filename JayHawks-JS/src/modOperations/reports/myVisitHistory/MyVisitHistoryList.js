import React from "react";
import { format } from "date-fns";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import PrintHeader from "../../../components/PrintHeader";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import TaskButton from "../../../components/button/TaskButton";
import PdfButton from "../../../components/button/PdfButton";

const MyVisitHistoryList = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData(
    "visitbyuser",
    `/allVisit/myReport/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.map(
    ({
      allVisitId,
      visitDate,
      branchName,
      employeeName,
      designationName,
      visitType,
      stayOvernight,
      branchManagerName,
      managerName,
      submitDate,
      submitRemarks,
      acceptRemarks,
      rejectRemarks,
      isSubmit,
    }) => ({
      allVisitId,
      visitDate,
      branchName,
      employeeName,
      designationName,
      visitType,
      stayOvernight,
      branchManagerName,
      managerName,
      submitDate,
      submitRemarks,
      acceptRemarks,
      rejectRemarks,
      isSubmit,
    })
  );

  return (
    <>
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/opsPdf/myReport/${dataForm.fromDate}/${dataForm.tillDate}`}
        />

        <PrintHeader title="" fileName="visitReport.csv" data={data} />
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-11 list-header">
          <ListHeader label="Visit Date" />
          <ListHeader label="Branch Name" />
          <ListHeader label="Employee" />
          <ListHeader label="Designation" />
          <ListHeader label="Visit Type" />
          <ListHeader label="Stay Overnight" />
          <ListHeader label="Branch Manager" />
          <ListHeader label="Manager" />
          <ListHeader label="Submit Remarks" />
          <ListHeader label="Status" />

          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.allVisitId}
              className="grid grid-cols-1 md:grid-cols-11 list-body"
            >
              <ListCol
                label="Visit Date:"
                value={format(new Date(item.visitDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Branch Name : " value={item.branchName} />
              <ListCol label="Employee : " value={item.employeeName} />
              <ListCol label="Designation : " value={item.designationName} />
              <ListCol label="Visit Type : " value={item.visitType} />
              <ListCol label="Stay Overnight : " value={item.stayOvernight} />
              <ListCol
                label="Branch Manager : "
                value={item.branchManagerName}
              />
              <ListCol label="Manager : " value={item.managerName} />
              <ListCol label="Submit Remarks : " value={item.submitRemarks} />
              <ListCol
                label="Status : "
                value={
                  item.isSubmit === 0
                    ? "Created"
                    : item.isSubmit === 1
                    ? "Sumbit to BM & Supervisor"
                    : item.isSubmit === 5
                    ? "Closed"
                    : ""
                }
              />

              <div className="flex justify-end space-x-1">
                <TaskButton
                  path={`/ops/myVisit/report/preview/${item.allVisitId}`}
                  btnColor="btn-gray"
                />
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyVisitHistoryList;
