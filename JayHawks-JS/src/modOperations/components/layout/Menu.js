// import React from "react";
// import { menuOperations } from "../../../data/menuOperations";
// import MainMenu from "../../../components/layout/MainMenu";
// import { AiOutlineExport } from "react-icons/ai";
// import { useGlobalContext } from "../../../hooks/context";

// const Menu = () => {
//   const value = useGlobalContext();
//   const menu = menuOperations;
//   // const inputValue =
//   //   value.role === "Branch Manager"
//   //     ? "BM Visits"
//   //     : value.role === "Area Manager"
//   //     ? "AM Visits"
//   //     : (value.role === "Super Admin" ||
//   //         value.role === "Operations Head" ||
//   //         value.role === "Operations Manager" ||
//   //         value.role === "Regional Manager") &&
//   //       "RM Visits";

//   // const data = menu.menuData.filter((item) => {
//   //   const name = item.name;
//   //   return name.includes(inputValue);
//   // });

//   const data = menu.menuData;

//   return (
//     <div className="flex flex-col w-56 items-center h-full overflow-hidden text-gray-400">
//       <div className="">
//         <div className="flex flex-col items-center">
//           {data.length > 0 &&
//             data.map((item, index) => (
//               <MainMenu
//                 key={index}
//                 name={item.name}
//                 link={item.link}
//                 Icon={item.Icon}
//               />
//             ))}
//         </div>

//         {value.role === "User" && (
//           <div className="flex flex-col items-center mt-2 pt-2 border-t border-gray-700">
//             <span
//               className="sidebar-menu-item cursor-pointer"
//               onClick={value.signOut}
//             >
//               <AiOutlineExport size={20} />
//               <span className="ml-2 text-sm font-medium"> Sign Out</span>
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Menu;

import React from "react";
import MainMenu from "../../../components/layout/MainMenu";
import { useGlobalContext } from "../../../hooks/context";

const Menu = () => {
  const value = useGlobalContext();
  const data = value.menus.filter((item) => {
    if (item.moduleName.toLowerCase() === "Operations".toLowerCase())
      return item;
    else return null;
  });


  return (
    <div className="flex flex-col w-56 items-center h-full overflow-hidden text-gray-400">
      <div className="">
        <div className="flex flex-col items-center">
          {data.length > 0 &&
            data.map((item, index) => (
              <MainMenu
                key={index}
                name={item.menuName}
                link={item.link}
                icon={item.icon}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
