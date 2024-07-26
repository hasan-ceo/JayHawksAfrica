import React from "react";
import SettingsItem from "../../components/layout/SettingsItem";
import { menuHr } from "../../data/menuHr";
// import ProcessButton from "../../components/button/ProcessButton";

const Training = () => {
  const data = menuHr.trainingData;
  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
          Training
        </h1>
        {/* <ProcessButton /> */}
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

export default Training;
