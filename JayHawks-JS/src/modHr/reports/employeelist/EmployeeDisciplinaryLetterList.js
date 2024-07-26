import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import SearchHeader from "../../../components/SearchHeader";
import PreviewButton from "../../../components/button/PreviewButton";
import { format } from "date-fns";
import PdfButton from "../../../components/button/PdfButton";

const EmployeeDisciplinaryLetterList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "empdisciplinaryletter",
    `/hrreports/disciplinaryletter/${dataForm.fromDate}/${dataForm.tillDate}`
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
        disciplinaryLetterId,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        letterType,
        issueDate,
        title,
        particulars,
      }) => ({
        disciplinaryLetterId,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        letterType,
        issueDate,
        title,
        particulars,
      })
    );

  return (
    <>
      {/* <PrintHeader title="" fileName="disciplinaryLetter.csv" data={data} /> */}
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/HrPdfReport/disciplinaryletter/${dataForm.fromDate}/${dataForm.tillDate}`}
        />
        <PrintHeader
          title=""
          // fileName="disciplinaryLetter.csv"
          data={data}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-10 list-header">
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Designation" />
          <ListHeader label="Letter Type" />
          <ListHeader label="Issue Date" />
          <ListHeader label="Subject" className="md:col-span-2" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.empDisciplinaryId}
              className="grid grid-cols-1 md:grid-cols-10 list-body"
            >
              <ListCol label="Branch:" value={item.branchName} />
              <ListCol label="Department: " value={item.departmentName} />
              <ListCol label="PIN: " value={item.employeePin} />
              <ListCol label="Employee Name: " value={item.employeeName} />
              <ListCol label="Designation: " value={item.designationName} />
              <ListCol label="Letter Type: " value={item.letterType} />
              <ListCol
                label="Issue Date: "
                value={format(new Date(item.issueDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Subject : "
                value={item.title}
                className="md:col-span-2"
              />
              <div className="flex justify-end space-x-2">
                <PreviewButton
                  path={`/hr/reports/employee/disciplinary/Letter/preview/${item.disciplinaryLetterId}`}
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

export default EmployeeDisciplinaryLetterList;
