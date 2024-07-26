import React, { useState } from "react";
import { format } from "date-fns";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import SearchHeader from "../../../components/SearchHeader";
import PdfButton from "../../../components/button/PdfButton";

const EmployeeTransferList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "employees",
    `/hrreports/transfer/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (
        item.employeePin.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.designationName.toLowerCase().indexOf(query.toLowerCase()) !==
          -1 ||
        item.preBranchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.preDepartmentName.toLowerCase().indexOf(query.toLowerCase()) !==
          -1 ||
        item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        empHistoryId,
        employeePin,
        employeeName,
        designationName,
        preBranchName,
        preDepartmentName,
        effectiveDate,
        branchName,
        departmentName,
        particulars,
      }) => ({
        empHistoryId,
        employeePin,
        employeeName,
        designationName,
        preBranchName,
        preDepartmentName,
        effectiveDate,
        branchName,
        departmentName,
        particulars,
      })
    );

  return (
    <>
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/HrPdfReport/transfer/${dataForm.fromDate}/${dataForm.tillDate}`}
        />
        <PrintHeader
          title=""
          // fileName="history.csv"
          data={data}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper text-xs">
        <div className="md:grid grid-cols-9 list-header">
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Designation" />
          <ListHeader label="Old Branch" />
          <ListHeader label="Old Department" />
          <ListHeader label="Effective Date" />
          <ListHeader label="New Branch" />
          <ListHeader label="New Department" />
          <ListHeader label="Particulars" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.empHistoryId}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol label="Designation : " value={item.designationName} />
              <ListCol label="Old Branch : " value={item.preBranchName} />
              <ListCol
                label="Old Department : "
                value={item.preDepartmentName}
              />
              <ListCol
                label="Effective Date : "
                value={format(new Date(item.effectiveDate), "dd/MMM/yyyy")}
              />

              <ListCol label="Branch : " value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol label="Particulars : " value={item.particulars} />
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {data.length}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeTransferList;
