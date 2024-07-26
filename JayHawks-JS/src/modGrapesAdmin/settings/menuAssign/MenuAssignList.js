import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import MenuAssignForm from "./MenuAssignForm";

const MenuAssignList = () => {
  const defaultValues = {
    menuAssignId: "",
    userId: "",
    menuId: "",
  };

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("appmenu", "/menuAssign/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Menu Assign" />
      <MenuAssignForm
        defaultValues={defaultValues}
        action={refetch}
        btnText="Save"
        path="/menuAssign/create"
      />

      <div className="list-wrapper mt-4">
        <div className="md:grid grid-cols-6 list-header">
          <ListHeader label="User Name" />
          <ListHeader label="Module Name" />
          <ListHeader label="Menu Name" />
          <ListHeader label="Link" />
          <ListHeader label="Icon" />

          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.apiId}
              className="grid grid-cols-1 md:grid-cols-6 list-body"
            >
              <ListCol label="User Name:" value={item.fullName} />
              <ListCol label="Manu Name:" value={item.moduleName} />
              <ListCol label="Manu Name:" value={item.menuName} />
              <ListCol label="Link :" value={item.link} />
              <ListCol label="Icon :" value={item.icon} />

              <div className="flex justify-end space-x-2">
                <DeleteButton
                  action={refetch}
                  path={`/menuAssign/delete/${item.menuAssignId}`}
                />
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuAssignList;
