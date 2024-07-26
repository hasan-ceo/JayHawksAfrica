import React, { useState } from "react";
import { format } from "date-fns";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import SearchHeader from "../../../components/SearchHeader";
import PdfButton from "../../../components/button/PdfButton";

const EmployeeLeaveList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "employeeleavelist",
    `/hrreports/leave/${dataForm.fromDate}/${dataForm.tillDate}`
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
        item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.designationName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        empLeaveId,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        leaveName,
        fromDate,
        tillDate,
        particulars,
        leaveStatus,
        authorityName,
      }) => ({
        empLeaveId,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        leaveName,
        fromDate,
        tillDate,
        particulars,
        leaveStatus,
        authorityName,
      })
    );

  return (
    <>
      {/* <PrintHeader title="" fileName="leave.csv" data={data} /> */}
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/HrPdfReport/leave/${dataForm.fromDate}/${dataForm.tillDate}`}
        />
        <PrintHeader
          title=""
          //  fileName="leave.csv"
          data={data}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-11 list-header">
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Designation" />
          <ListHeader label="Leave Name" />
          <ListHeader label="From Date" />
          <ListHeader label="Till Date" />
          <ListHeader label="Particulars" />
          <ListHeader label="Status" />
          <ListHeader label="At" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.empLeaveId}
              className="grid grid-cols-1 md:grid-cols-11 list-body"
            >
              <ListCol label="Branch:" value={item.branchName} />
              <ListCol label="Department: " value={item.departmentName} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name: " value={item.employeeName} />
              <ListCol label="Designation: " value={item.designationName} />
              <ListCol label="Leave Name: " value={item.leaveName} />
              <ListCol
                label="From Date: "
                value={format(new Date(item.fromDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Till Date : "
                value={format(new Date(item.tillDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Particulars : " value={item.particulars} />
              <ListCol label="Status : " value={item.leaveStatus} />
              <ListCol label="At : " value={item.authorityName} />
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

export default EmployeeLeaveList;
