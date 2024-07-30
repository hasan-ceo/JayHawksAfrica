import React from "react";
import SettingsItemOnline from "../../components/layout/SettingsItemOnline";
import { useGlobalContext } from "../../hooks/context";

const Settings = () => {
  const value = useGlobalContext();
  const data = value.subMenus.filter((item) => {
    if (
      item.moduleName.toLowerCase() === "Accounts".toLowerCase() &&
      item.menuName.toLowerCase() === "Settings".toLowerCase() &&
      item.section?.toLowerCase() !== "DayOpen".toLowerCase()
    )
      return item;
    else return null;
  });
  const dayOpenClose = value.subMenus.filter((item) => {
    if (
      item.moduleName.toLowerCase() === "Accounts".toLowerCase() &&
      item.menuName.toLowerCase() === "Settings".toLowerCase() &&
      item.section?.toLowerCase() === "DayOpen".toLowerCase()
    )
      return item;
    else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.length > 0 &&
          data.map((item, index) => (
            <SettingsItemOnline
              key={index}
              name={item.subMenuName}
              link={item.link}
              icon={item.icon}
            />
          ))}
      </div>
      <div className="section-title  my-2">Day Status</div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dayOpenClose.length > 0 &&
          dayOpenClose.map((item, index) => (
            <SettingsItemOnline
              key={index}
              name={item.subMenuName}
              link={item.link}
              icon={item.icon}
            />
          ))}
      </div>
    </div>
  );
};

export default Settings;
