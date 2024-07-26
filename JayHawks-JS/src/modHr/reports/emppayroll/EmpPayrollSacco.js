import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import SearchHeader from "../../../components/SearchHeader";
import PrintHeader from "../../../components/PrintHeader";
import EditButton from "../../../components/button/EditButton";
import { format } from "date-fns";
import TopHeader from "../../../components/TopHeader";
import PdfButton from "../../../components/button/PdfButton";

const EmployeeSacco = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("employees", "/emppayroll/sacco");

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
      <TopHeader title="Sacco List" />
      <div className="flex justify-end items-center">
        <PdfButton path={`/HrPdfReport/sacco`} />
        <PrintHeader
          title=""
          fileName="sacco.csv"
          data={data.map(
            ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              contactNumber,
              balance,
            }) => ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              contactNumber,
              balance,
            })
          )}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-9 list-header">
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Joining Date" />
          <ListHeader label="Designation" />
          <ListHeader label="Contact Number" />
          <ListHeader label="Sacco Balance" className="flex justify-end" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.employeeId}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <ListCol label="Branch:" value={item.branchName} />
              <ListCol label="Department: " value={item.departmentName} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name: " value={item.employeeName} />
              <ListCol
                label="Joining Date: "
                value={format(new Date(item.joiningDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Designation: " value={item.designationName} />
              <ListCol label="Contact Number: " value={item.contactNumber} />
              <ListCol
                label="Contact Number: "
                value={item.balance.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <div className="flex justify-end">
                <EditButton
                  path={`/hr/reports/payroll/sacco/${item.employeeId}`}
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

export default EmployeeSacco;
