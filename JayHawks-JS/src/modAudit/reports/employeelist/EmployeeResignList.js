import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import SearchHeader from "../../../components/SearchHeader";
import { format } from "date-fns";
import TaskButton from "../../../components/button/TaskButton";
import PdfButton from "../../../components/button/PdfButton";

const EmployeeResignList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "employees",
    `/hrreports/resign/${dataForm.fromDate}/${dataForm.tillDate}`
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
        employeeId,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        dateOfBirth,
        gender,
        joiningDate,
        contactNumber,
        email,
        resignDate,
        resignReasonName,
        particulars,
      }) => ({
        employeeId,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        dateOfBirth,
        designationName,
        gender,
        joiningDate,
        contactNumber,
        email,
        resignDate,
        resignReasonName,
        particulars,
      })
    );

  return (
    <>
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/HrPdfReport/resign/${dataForm.fromDate}/${dataForm.tillDate}`}
        />
        <PrintHeader
          title=""
          // fileName="resign.csv"
          data={data}
        />
      </div>

      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-12 list-header">
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Gender, Date Of Birth" />
          <ListHeader label="Designation" />
          <ListHeader label="Joining Date" />
          <ListHeader label="Contact Phone, Email: " />
          <ListHeader label="Resign Date" />
          <ListHeader label="Reason" />
          <ListHeader label="Particulars" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.employeeId}
              className="grid grid-cols-1 md:grid-cols-12 list-body"
            >
              <ListCol label="Branch:" value={item.branchName} />
              <ListCol label="Department: " value={item.departmentName} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name: " value={item.employeeName} />
              <ListCol
                label="Gender & DOB: "
                value={
                  item.gender +
                  ", " +
                  format(new Date(item.dateOfBirth), "dd/MMM/yyyy")
                }
              />
              <ListCol label="Designation: " value={item.designationName} />
              <ListCol
                label="Joining Date: "
                value={format(new Date(item.joiningDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Contact Phone, Email: "
                value={item.contactNumber + ", " + item.email}
              />
              <ListCol
                label="Resign Date: "
                value={format(new Date(item.resignDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Reason: " value={item.resignReasonName} />
              <ListCol label="Particulars: " value={item.particulars} />
              <div className="flex justify-end space-x-2">
                <TaskButton
                  path={`/audit/reports/employee/resign/details/${item.employeeId}`}
                />
                <PdfButton
                  path={`/HrPdfReport/ResignDetails/${item.employeeId}`}
                />
              </div>
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

export default EmployeeResignList;
