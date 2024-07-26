import React from "react";
import SettingsItem from "../../components/layout/SettingsItem";
import TopHeader from "../../components/TopHeader";
import { menuAdmin } from "../../data/menuAdmin";

const Settings = () => {
  const data = menuAdmin;
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Settings" />
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
