import React from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import { format } from "date-fns";

const DemotionSearch = ({ query }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("DemotionSearch", `/empDemotion/search/${query}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="list-wrapper text-xs">
      <div className="md:grid grid-cols-9 list-header gap-1">
        <ListHeader label="Effective Date" />
        <ListHeader label="PIN" />
        <ListHeader label="Employee Name" />
        <ListHeader label="Pre Designation" />
        <ListHeader label="Branch" />
        <ListHeader label="Department" />
        <ListHeader label="Designation" />
        <ListHeader label="Gross Salary" className="flex justify-end" />
        <ListHeader label="Particulars" />
      </div>
      {list.data.length > 0 &&
        list.data.map((item) => (
          <div
            key={item.empHistoryId}
            className="grid grid-cols-1 md:grid-cols-9 list-body gap-1"
          >
            <ListCol
              label="Effective Date : "
              value={format(new Date(item.effectiveDate), "dd/MMM/yyyy")}
            />
            <ListCol label="PIN : " value={item.employeePin} />
            <ListCol label="Employee Name : " value={item.employeeName} />
            <ListCol label="Designation : " value={item.preDesignation} />
            <ListCol label="Branch : " value={item.branchName} />
            <ListCol label="Department : " value={item.departmentName} />
            <ListCol label="Designation Name : " value={item.designationName} />
            <ListCol
              label={"Gross Salary : "}
              value={
                item.grossSalaryUsd > 0
                  ? item.grossSalaryUsd.toLocaleString("en-US") + " USD"
                  : item.grossSalary.toLocaleString("en-US") + " UGX"
              }
              className="flex justify-start md:justify-end"
            />
            <ListCol label="Particulars : " value={item.particulars} />
          </div>
        ))}

      <div className="list-footer">
        <div className="col-span-10"></div>
        <div className="flex justify-center">
          <span className="font-semibold">Total : {list.data.length}</span>
        </div>
      </div>
    </div>
  );
};

export default DemotionSearch;
