import React from "react";
import SettingsItem from "../../components/layout/SettingsItem";
// import { menuOperations } from "../../data/menuOperations";
import { useGlobalContext } from "../../hooks/context";

const Reports = () => {
  // const data = menuOperations.reportsData;
  const value = useGlobalContext();
  const data = value.subMenus.filter((item) => {
    if (
      item.moduleName.toLowerCase() === "CRM".toLowerCase() &&
      item.menuName.toLowerCase() === "Reports".toLowerCase()
    )
      return item;
    else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
          Monitoring Reports
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.length > 0 &&
          data.map((item, index) => (
            <SettingsItem
              key={index}
              name={item.name}
              link={item.link}
              Icon={item.Icon}
            />
          ))}
      </div>
    </div>
  );
};

export default Reports;
