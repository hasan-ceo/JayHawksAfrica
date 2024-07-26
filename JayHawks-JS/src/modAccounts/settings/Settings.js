import React from "react";
import SettingsItem from "../../components/layout/SettingsItem";
import { menuAccounts } from "../../data/menuAccounts";

const Settings = () => {
  const data = menuAccounts;
  return (
    <div className="card w-full max-w-screen-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.subSettingMenuData.length > 0 &&
          data.subSettingMenuData.map((item, index) => (
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

export default Settings;
