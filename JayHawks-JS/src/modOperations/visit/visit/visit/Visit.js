import React from "react";

import { menuOperations } from "../../../../data/menuOperations";
import SettingsItem from "../../../../components/layout/SettingsItem";
import TopHeader from "../../../../components/TopHeader";

const Visit = () => {
  const data = menuOperations;
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Visit" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.allVisitMenuData.length > 0 &&
          data.allVisitMenuData.map((item, index) => (
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

export default Visit;
