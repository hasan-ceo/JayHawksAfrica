import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import SearchHeader from "../../../components/SearchHeader";
import PrintHeader from "../../../components/PrintHeader";
import { format } from "date-fns";
import PdfButton from "../../../components/button/PdfButton";
import TopHeader from "../../../components/TopHeader";

const EmployeeTenure = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("employees", "/hrreports/tenure");

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
      <TopHeader title="Tenure List" />
      {/* <PrintHeader
        title="Tenure List"
        fileName="tenure.csv"
        data={data.map(
          ({
            branchName,
            departmentName,
            employeePin,
            employeeName,
            designationName,
            dateOfBirth,
            email,
            contactNumber,
            tenureYear,
            tenureMonth,
          }) => ({
            branchName,
            departmentName,
            employeePin,
            employeeName,
            designationName,
            dateOfBirth,
            email,
            contactNumber,
            tenureYear,
            tenureMonth,
          })
        )}
      /> */}
      <div className="flex justify-end items-center">
        <PdfButton path={`/HrPdfReport/tenure`} />
        <PrintHeader
          title=""
          fileName="tenure.csv"
          data={data.map(
            ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              dateOfBirth,
              email,
              contactNumber,
              joiningDate,
              tenureYear,
              tenureMonth,
            }) => ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              dateOfBirth,
              email,
              contactNumber,
              joiningDate,
              tenureYear,
              tenureMonth,
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
          <ListHeader label="Date Of Birth" />
          <ListHeader label="Joining Date" />
          <ListHeader label="Designation" />
          <ListHeader label="Email" />
          <ListHeader label="Contact Number" />
          <ListHeader label="Year" className="flex justify-end" />
          <ListHeader label="Month" className="flex justify-end" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.employeeId}
              className="grid grid-cols-1 md:grid-cols-11 list-body"
            >
              <ListCol label="Branch:" value={item.branchName} />
              <ListCol label="Department: " value={item.departmentName} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name: " value={item.employeeName} />
              <ListCol
                label="Date Of Birth: "
                value={format(new Date(item.dateOfBirth), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Joining Date: "
                value={format(new Date(item.joiningDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Designation: " value={item.designationName} />
              <ListCol label="Email: " value={item.email} />
              <ListCol label="Contact Number: " value={item.contactNumber} />
              <ListCol
                label="Tenure Year: "
                value={item.tenureYear}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Tenure Month: "
                value={item.tenureMonth}
                className="flex justify-start md:justify-end"
              />
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

export default EmployeeTenure;
