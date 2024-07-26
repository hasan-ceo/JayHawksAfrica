import {
  AiOutlineComment,
  AiOutlineFileText,
  AiOutlineCoffee,
  AiOutlineFilePpt,
  AiOutlineUnlock,
  AiOutlineUnorderedList,
  AiOutlineAudit,
  AiOutlineTeam,
  AiOutlineRead,
  AiOutlineHdd,
  AiOutlineBarChart,
  AiOutlineUser,
  AiOutlineBranches,
  AiOutlineFieldTime,
  AiOutlineFileSearch,
  AiOutlineProfile,
  AiOutlineBorderOuter,
  AiOutlineDesktop,
  AiOutlineOrderedList,
  AiOutlineCompress,
  AiOutlineCheckSquare,
  AiFillMoneyCollect,
} from "react-icons/ai";
import { MdOutlineRecommend, MdOutlineRequestQuote } from "react-icons/md";

export const menuUser = {
  menuData: [
    {
      name: "My Feedback",
      link: "/my/feedback",
      Icon: AiOutlineComment,
    },
    {
      name: "Notice",
      link: "/notice/list",
      Icon: AiOutlineFileText,
    },
    {
      name: "Training",
      link: "/training",
      Icon: AiOutlineRead,
    },
    {
      name: "Applications",
      link: "/applications/leave",
      Icon: AiOutlineProfile,
    },
    {
      name: "My Disciplinary Letter",
      link: "/my/disciplinary/letter",
      Icon: AiOutlineHdd,
    },
    {
      name: "My Leave",
      link: "/my/leave",
      Icon: AiOutlineCoffee,
    },

    {
      name: "My Ticket",
      link: "/ticket/list",
      Icon: MdOutlineRequestQuote,
    },
    {
      name: "Advance Salary",
      link: "/advanceSalary",
      Icon: AiFillMoneyCollect,
    },

    {
      name: "My Payslip",
      link: "/my/Payslip",
      Icon: AiOutlineFilePpt,
    },
    {
      name: "My Sacco statement",
      link: "/my/saccostatement",
      Icon: AiOutlineUnorderedList,
    },
    {
      name: "My Team",
      link: "/my/team",
      Icon: AiOutlineTeam,
    },
    {
      name: "My Transport Bill",
      link: "/transportBill",
      Icon: AiFillMoneyCollect,
    },
    {
      name: "Evaluations",
      link: "/evaluation",
      Icon: AiOutlineAudit,
    },

    {
      name: "My Device",
      link: "/my/deviceregister",
      Icon: AiOutlineDesktop,
    },
    {
      name: "My Details",
      link: "/my/details",
      Icon: AiOutlineAudit,
    },
    {
      name: "Reset My Password",
      link: "/my/password/reset",
      Icon: AiOutlineUnlock,
    },
  ],
  advanceSalaryData: [
    {
      name: "My Advance Salary",
      link: "/advanceSalary/myAdvanceSalary/list",
      Icon: AiFillMoneyCollect,
    },
    {
      name: "Recommend Advance Salary Applications",
      link: "/advanceSalary/recommendApplications",
      Icon: MdOutlineRecommend,
    },
  ],
  evaluationData: [
    {
      name: "My Evaluations",
      link: "/my/evaluation/list",
      Icon: AiOutlineAudit,
    },
    {
      name: "Application Received",
      link: "/evaluation/first/Review/list",
      Icon: AiOutlineBorderOuter,
    },
    {
      name: "Second Review",
      link: "/evaluation/second/review/list",
      Icon: AiOutlineCheckSquare,
    },
    {
      name: "Complete Applications",
      link: "/evaluation/reports/complete",
      Icon: AiOutlineOrderedList,
    },
    {
      name: "Complete Applications For Three Months",
      link: "/evaluationThree/reports/complete",
      Icon: AiOutlineOrderedList,
    },
    {
      name: "Complete Applications For Six Months",
      link: "/evaluationSix/reports/complete",
      Icon: AiOutlineOrderedList,
    },
    {
      name: "Summary",
      link: "/evaluation/reports/summary",
      Icon: AiOutlineCompress,
    },
  ],
  mainModule: [
    {
      name: "Hr",
      link: "/hr",
      Icon: AiOutlineUser,
    },
    {
      name: "Accounts",
      link: "/accounts",
      Icon: AiOutlineBarChart,
    },
    {
      name: "Audit",
      link: "/audit",
      Icon: AiOutlineFileSearch,
    },
    {
      name: "Operations",
      link: "/ops",
      Icon: AiOutlineFieldTime,
    },
    {
      name: "IT",
      link: "/it",
      Icon: AiOutlineBranches,
    },
  ],

  travelingData: [
    {
      name: "My Application",
      link: "/transportBill/list",
      Icon: AiFillMoneyCollect,
    },

    {
      name: "Application Received",
      link: "/transportBill/received/list",
      Icon: AiFillMoneyCollect,
    },
    {
      name: "Unpaid Bills as BM",
      link: "/transportBill/unpaid/list",
      Icon: AiFillMoneyCollect,
    },
  ],
};
