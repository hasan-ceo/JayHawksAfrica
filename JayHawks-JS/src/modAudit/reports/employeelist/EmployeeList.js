import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import SearchHeader from "../../../components/SearchHeader";
import PrintHeader from "../../../components/PrintHeader";
import { format } from "date-fns";
import TaskButton from "../../../components/button/TaskButton";
import PdfButton from "../../../components/button/PdfButton";
import TopHeader from "../../../components/TopHeader";

const EmployeeList = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("employees", "/hrreports/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data.filter((item) => {
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
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Employee List" />
      <div className="flex justify-end items-center">
        <PdfButton path={`/HrPdfReport/list`} />
        <PrintHeader
          data={data.map(
            ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              dateOfBirth,
              designationName,
              joiningDate,
              gender,
              contactNumber,
              grossSalary,
              grossSalaryUsd,
              email,
            }) => ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              dateOfBirth,
              designationName,
              joiningDate,
              gender,
              contactNumber,
              grossSalary,
              grossSalaryUsd,
              email,
            })
          )}
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
          <ListHeader label="DOB" />
          <ListHeader label="Designation" />
          <ListHeader label="Joining Date" />
          <ListHeader label="Gender" />
          <ListHeader label="Contact Number" />
          <ListHeader label="Gross Salary" className="flex justify-end" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.employeeId}
              className="grid grid-cols-1 md:grid-cols-11 list-body"
            >
              <ListCol label="Branch : " value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol label="PIN/Employee : " value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol
                label="DOB : "
                value={format(new Date(item.dateOfBirth), "dd/MMM/yyyy")}
              />
              <ListCol label="Designation: " value={item.designationName} />
              <ListCol
                label="Joining Date : "
                value={format(new Date(item.joiningDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Gender : " value={item.gender} />
              <ListCol label="Contact Number : " value={item.contactNumber} />
              <ListCol
                label="Gross Salary : "
                value={
                  item.grossSalaryUsd === 0
                    ? item.grossSalary.toLocaleString("en-US") + " UGX"
                    : item.grossSalaryUsd.toLocaleString("en-US") + " USD"
                }
                className="flex justify-start md:justify-end"
              />
              <div className="flex justify-end space-x-1 px-1">
                <TaskButton
                  path={`/audit/reports/employee/details/${item.employeeId}`}
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
    </div>
  );
};

export default EmployeeList;
