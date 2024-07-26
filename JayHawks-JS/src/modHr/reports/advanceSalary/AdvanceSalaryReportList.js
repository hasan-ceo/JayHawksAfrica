import React, { useState } from "react";
import { format } from "date-fns";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import SearchHeader from "../../../components/SearchHeader";
import PrintHeader from "../../../components/PrintHeader";
import PdfButton from "../../../components/button/PdfButton";

const AdvanceSalaryReportList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "hrreportsAdvanceSalarylist",
    `/hrreports/advanceSalary/${dataForm.fromDate}/${dataForm.tillDate}`
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
        item.officeName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.designationName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        advanceAmount,
        neededAdvanceDate,
        purposeOfAdvance,
        advanceStatus,
        authorityName,
      }) => ({
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        advanceAmount,
        neededAdvanceDate,
        purposeOfAdvance,
        advanceStatus,
        authorityName,
      })
    );

  return (
    <div className="w-full max-w-screen-xl">
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/HrPdfReport/advanceSalary/${dataForm.fromDate}/${dataForm.tillDate}`}
        />

        <PrintHeader title="" fileName="advacesalary.csv" data={data} />
      </div>
      <SearchHeader placeholder="PIN / Name" action={setQuery} />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-10 list-header">
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Designation" />
          <ListHeader label="Amount" />
          <ListHeader label="Needed Date" />
          <ListHeader label="Purpose Of Advance" />
          <ListHeader label="Status" />
          <ListHeader label="Recommended By" />
        </div>
        {data.length > 0 &&
          data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-10 list-body"
            >
              <ListCol label="Branch :" value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.designationName} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol
                label="Amount : "
                value={item.advanceAmount.toLocaleString()}
              />
              <ListCol
                label="Needed Advance Date : "
                value={format(new Date(item.neededAdvanceDate), "dd/MMM/yyyy")}
              />

              <ListCol
                label="Purpose Of Advance : "
                value={item.purposeOfAdvance}
              />
              <ListCol label="Status : " value={item.advanceStatus} />
              <ListCol label="Recommended By : " value={item.authorityName} />
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

export default AdvanceSalaryReportList;
