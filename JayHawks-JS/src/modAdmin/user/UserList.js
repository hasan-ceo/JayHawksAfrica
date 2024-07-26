import React, { useState } from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import EditButton from "../../components/button/EditButton";
import DeleteButton from "../../components/button/DeleteButton";
import ResetButton from "../../components/button/ResetButton";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import SearchHeader from "../../components/SearchHeader";
import UserButton from "../../components/button/UserButton";
import TopHeader from "../../components/TopHeader";

const UserList = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("userlist", "/user/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (
        item.employeePin.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.userName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.role.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.designationName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        id,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        userName,
        role,
      }) => ({
        id,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        userName,
        role,
      })
    );

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="User List" btn="Save" path="/admin/user/add" />
      <div className="flex justify-end px-0 py-2 items-center">
        {/* <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
          User List
        </h1> */}
        <UserButton action={refetch} />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="User Name / Role / PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Designation" />
          <ListHeader label="User Name" />
          <ListHeader label="Role" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-8 list-body"
            >
              <ListCol label="Branch : " value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol label="Designation : " value={item.designationName} />
              <ListCol label="User Name : " value={item.userName} />
              <ListCol label="Role : " value={item.role} />
              <div>
                <div className="flex justify-end space-x-2">
                  <ResetButton
                    action={refetch}
                    path={`/user/reset/${item.id}`}
                  />
                  <EditButton path={`/admin/user/edit/${item.id}`} />
                  <DeleteButton
                    action={refetch}
                    path={`/user/delete/${item.id}`}
                  />
                </div>
              </div>
            </div>
          ))}
        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
