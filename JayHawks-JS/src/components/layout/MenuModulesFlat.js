// import React from "react";
// import { Link } from "react-router-dom";
// import { useGlobalContext } from "../../hooks/context";
// import {
//   AiOutlineBarChart,
//   AiOutlineUser,
//   AiOutlineHome,
//   AiOutlineBranches,
//   AiOutlineFieldTime,
//   AiOutlineFileSearch,
//   AiOutlineUserSwitch,
// } from "react-icons/ai";
// import LogoutButton from "../button/LogoutButton";
// import Refresh from "../button/Refresh";

// const MenuModulesFlat = () => {
//   const value = useGlobalContext();
//   return (
//     <div className="flex space-x-1">
//       {value.role === "Super Admin" && (
//         <>
//           <Link
//             className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow"
//             to="/dashboard"
//           >
//             <AiOutlineHome size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">Home</span>
//           </Link>
//           <Link
//             className="hidden md:flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow "
//             to="/crm"
//           >
//             <AiOutlineUserSwitch size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">CRM</span>
//           </Link>
//           <Link
//             className="hidden md:flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow "
//             to="/ops"
//           >
//             <AiOutlineFieldTime size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">
//               Operations
//             </span>
//           </Link>
//           <Link
//             className="hidden md:flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow "
//             to="/hr"
//           >
//             <AiOutlineUser size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">HR</span>
//           </Link>
//           <Link
//             className="hidden md:flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow "
//             to="/accounts"
//           >
//             <AiOutlineBarChart size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">
//               Accounts
//             </span>
//           </Link>
//           <Link
//             className="hidden md:flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow "
//             to="/audit"
//           >
//             <AiOutlineFileSearch size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">
//               Audit
//             </span>
//           </Link>
//           <Link
//             className="hidden md:flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow"
//             to="/admin"
//           >
//             <AiOutlineBranches size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">
//               Admin
//             </span>
//           </Link>
//         </>
//       )}

//       {(value.role === "Loan Officer" || value.role === "User") && (
//         <>
//           <Link
//             className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow"
//             to="/dashboard"
//           >
//             <AiOutlineHome size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">Home</span>
//           </Link>
//           <Link
//             className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow "
//             to="/crm"
//           >
//             <AiOutlineUserSwitch size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">CRM</span>
//           </Link>
//         </>
//       )}

//       {(value.role === "Operations Head" ||
//         value.role === "Operations Manager" ||
//         value.role === "Regional Manager" ||
//         value.role === "Area Manager" ||
//         value.role === "Branch Manager") && (
//         <>
//           <Link
//             className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow"
//             to="/dashboard"
//           >
//             <AiOutlineHome size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">Home</span>
//           </Link>
//           <Link
//             className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow "
//             to="/crm"
//           >
//             <AiOutlineUserSwitch size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">CRM</span>
//           </Link>
//           <Link
//             className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow "
//             to="/ops"
//           >
//             <AiOutlineFieldTime size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">
//               Operations
//             </span>
//           </Link>
//         </>
//       )}

//       {(value.role === "HR Manager" ||
//         value.role === "HR Executive" ||
//         value.role === "Accounts Manager" ||
//         value.role === "Accounts Executive") && (
//         <>
//           <Link
//             className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow"
//             to="/dashboard"
//           >
//             <AiOutlineHome size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">Home</span>
//           </Link>
//           <Link
//             className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow "
//             to="/hr"
//           >
//             <AiOutlineUser size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">HR</span>
//           </Link>
//           <Link
//             className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow "
//             to="/accounts"
//           >
//             <AiOutlineBarChart size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">
//               Accounts
//             </span>
//           </Link>
//         </>
//       )}

//       {(value.role === "Audit Manager" || value.role === "Audit Executive") && (
//         <Link
//           className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow "
//           to="/audit"
//         >
//           <AiOutlineFileSearch size={30} />
//           <span className="ml-1 text-lg font-bold hidden lg:block">Audit</span>
//         </Link>
//       )}

//       {value.role === "Grapes Admin" && (
//         <Link
//           className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow "
//           to="/grapes"
//         >
//           <AiOutlineFileSearch size={30} />
//           <span className="ml-1 text-lg font-bold hidden lg:block">
//             Grapes Admin
//           </span>
//         </Link>
//       )}

//       {(value.role === "FMPO Executive" || value.role === "FMPO Manager") && (
//         <>
//           <Link
//             className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow"
//             to="/dashboard"
//           >
//             <AiOutlineHome size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">Home</span>
//           </Link>

//           <Link
//             className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow "
//             to="/ops"
//           >
//             <AiOutlineFieldTime size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">
//               Operations
//             </span>
//           </Link>
//         </>
//       )}

//       {value.role === "Country Team Leader" && (
//         <>
//           <Link
//             className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow"
//             to="/dashboard"
//           >
//             <AiOutlineHome size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">Home</span>
//           </Link>

//           <Link
//             className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow "
//             to="/ops"
//           >
//             <AiOutlineFieldTime size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">
//               Operations
//             </span>
//           </Link>
//           <Link
//             className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow "
//             to="/hr"
//           >
//             <AiOutlineUser size={30} />
//             <span className="ml-1 text-lg font-bold hidden lg:block">HR</span>
//           </Link>
//         </>
//       )}

//       <Refresh />
//       <LogoutButton />
//     </div>
//   );
// };

// export default MenuModulesFlat;

import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../hooks/context";
import LogoutButton from "../button/LogoutButton";
import Refresh from "../button/Refresh";
import Icons from "./Icons";

const MenuModulesFlat = () => {
  const value = useGlobalContext();
  const data = value.modules;

  // console.log(data);

  return (
    <div className="flex space-x-1">
      {data.length > 0 &&
        data.map((item, i) => (
          <Link
            key={i}
            className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-orange "
            to={item.link}
          >
            <Icons name={item.icon} />
            <span className="ml-1 text-lg font-bold hidden lg:block">
              {item.moduleName}
            </span>
          </Link>
        ))}

      <Refresh />
      <LogoutButton />
    </div>
  );
};

export default MenuModulesFlat;
