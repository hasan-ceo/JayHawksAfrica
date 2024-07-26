import React from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import { format } from "date-fns";

const TransferSearch = ({ query }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("empTransfersearch", `/emptransfer/search/${query}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="list-wrapper">
      <div className="md:grid grid-cols-9 list-header">
        <ListHeader label="PIN" />
        <ListHeader label="Employee Name" />
        <ListHeader label="Designation Name" />
        <ListHeader label="Old Branch" />
        <ListHeader label="Old Department" />
        <ListHeader label="Effective Date" />
        <ListHeader label="New Branch" />
        <ListHeader label="New Department" />
        <ListHeader label="Particulars" />
      </div>
      {list.data.length > 0 &&
        list.data.map((item) => (
          <div
            key={item.empHistoryId}
            className="grid grid-cols-1 md:grid-cols-9 list-body"
          >
            <ListCol label="PIN: " value={item.employeePin} />
            <ListCol label="Employee Name: " value={item.employeeName} />
            <ListCol label="Designation Name: " value={item.designationName} />
            <ListCol label="Old Branch:" value={item.preBranchName} />
            <ListCol label="Old Department: " value={item.preDepartmentName} />
            <ListCol
              label="Effective Date: "
              value={format(new Date(item.effectiveDate), "dd/MMM/yyyy")}
            />
            <ListCol label="New Branch:" value={item.branchName} />
            <ListCol label="New Department: " value={item.departmentName} />
            <ListCol label="Particulars: " value={item.particulars} />
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

export default TransferSearch;
