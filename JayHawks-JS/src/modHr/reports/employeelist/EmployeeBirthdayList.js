import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import { selectOptions } from "../../../data/selectOptions";
import SearchHeader from "../../../components/SearchHeader";
import { format } from "date-fns";
import PdfButton from "../../../components/button/PdfButton";

const EmployeeBirthdayList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("employees", `/hrreports/birthday/${dataForm.selectMonth}`);

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
        joiningDate,
        contactNumber,
        dateOfBirth,
      }) => ({
        employeeId,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        joiningDate,
        contactNumber,
        dateOfBirth,
      })
    );

  return (
    <>
      <div className="flex justify-end items-center">
        <PdfButton path={`/HrPdfReport/birthday/${dataForm.selectMonth}`} />
        <PrintHeader
          title=""
          fileName={`birthday-${
            selectOptions.monthNames[dataForm.selectMonth - 1]
          }.csv`}
          data={data}
        />
      </div>
      {/* <PrintHeader
        title=""
        fileName={`birthday-${
          selectOptions.monthNames[dataForm.selectMonth - 1]
        }.csv`}
        data={data}
      /> */}
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Joining Date" />
          <ListHeader label="Designation" />
          <ListHeader label="Contact Number" />
          <ListHeader label="Birthday" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.employeeId}
              className="grid grid-cols-1 md:grid-cols-8 list-body"
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
                label="Birthday: "
                value={format(new Date(item.dateOfBirth), "dd/MMM/yyyy")}
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
    </>
  );
};

export default EmployeeBirthdayList;
