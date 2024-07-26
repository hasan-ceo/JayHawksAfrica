import React from "react";
import TopHeader from "../../components/TopHeader";
// import Notification from "./Notification";

const Dashboard = () => {
  return (
   
      <div className="card w-full max-w-screen-xl">
        <TopHeader title="Accounts Dashboard" />
        {/* <Notification /> */}
      </div>

  );
};

export default Dashboard;


// // export default function Dashboard() {
// //   return (
// //     <div className="mb-5 grid md:grid-cols-3 place-items-stretch gap-3">
// //       Accounts dashboard
// //     </div>
// //   );
// // }

// import React from "react";
// import TopHeader from "../../components/TopHeader";

// const Dashboard = () => {
//   return (
//     <div className="card w-full max-w-screen-xl">
//       <div className="md:flex justify-between items-center">
//         <TopHeader
//           title={`Current Business Date : ${new Date().getDate()}/${
//             new Date().getDate() + 1
//           }/${new Date().getFullYear()}`}
//           btn="Return"
//           path=""
//         />
//         <div className="md:flex gap-x-2">
//           <button type="button" className="mb-2 btn-umojayellow md:mb-0">
//             Business Day Close
//           </button>
//           <button type="button" className="btn-umojayellow">
//             Cash Update
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
