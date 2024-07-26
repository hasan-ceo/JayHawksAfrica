import {
  AiOutlineSetting,
  AiOutlineFontColors,
  AiFillCarryOut,
  AiOutlineCluster,
  AiOutlineSolution,
  AiOutlineTeam,
  AiOutlineUserDelete,
  AiOutlineBgColors,
  AiOutlineCoffee,
  AiOutlineCarryOut,
} from "react-icons/ai";
import { FaBook, FaCube, FaFile, FaUnlockAlt } from "react-icons/fa";
import { MdSummarize } from "react-icons/md";

export const menuAudit = {
  menuData: [
    {
      name: "Other System Reports",
      link: "/audit/reports",
      Icon: AiOutlineSolution,
    },
    {
      name: "Branch Audit",
      link: "/audit/list",
      Icon: AiOutlineFontColors,
    },
    {
      name: "Closed Audit",
      link: "/audit/closeList",
      Icon: AiFillCarryOut,
    },
    {
      name: "Audit Workplan Summary",
      link: "/audit/workplanSummary/list",
      Icon: MdSummarize,
    },
    {
      name: "Audit Workplan",
      link: "/audit/workplan/list",
      Icon: AiFillCarryOut,
    },
    {
      name: "Audit Planning",
      link: "/audit/planning",
      Icon: FaBook,
    },
    {
      name: "Ongoing Investigations",
      link: "/audit/investigation/list",
      Icon: FaCube,
    },
    {
      name: "Departmental Audit",
      link: "/audit/departmentalInvestigationreport/list",
      Icon: FaBook,
    },
  ],
  settingMenuData: [
    {
      name: "Settings",
      link: "/audit/settings",
      Icon: AiOutlineSetting,
    },
  ],
  subSettingMenuData: [
    {
      name: "Branch Audit Test Steps",
      link: "/audit/settings/teststeps/list",
      Icon: AiOutlineCluster,
    },
    {
      name: "Audit Year Open",
      link: "/audit/settings/auditYear",
      Icon: FaUnlockAlt,
    },
    {
      name: "Inherent Risk",
      link: "/audit/settings/inherentrisk/list",
      Icon: AiOutlineCluster,
    },
    {
      name: "Residual Risk",
      link: "/audit/settings/residualrisk/list",
      Icon: FaUnlockAlt,
    },
    {
      name: "Weightage",
      link: "/audit/settings/weightage/List",
      Icon: FaUnlockAlt,
    },
    {
      name: "Previous Data Upload",
      link: "/audit/settings/previousdata/list",
      Icon: FaFile,
    },
    {
      name: "Departmental Audit Tests",
      link: "/audit/settings/departmentAuditTest/list",
      Icon: AiOutlineCluster,
    },
    {
      name: "Special Investigation",
      link: "/audit/settings/specialInvestigation/list",
      Icon: AiOutlineCluster,
    },
  ],
  reportsData: [
    {
      name: "Employee List",
      link: "/audit/reports/employee/list",
      Icon: AiOutlineTeam,
    },
    {
      name: "Resign List",
      link: "/audit/reports/employee/resign",
      Icon: AiOutlineUserDelete,
    },
    {
      name: "Transfer List",
      link: "/audit/reports/employee/transfer",
      Icon: AiOutlineBgColors,
    },
    {
      name: "Leave List",
      link: "/audit/reports/employee/leave",
      Icon: AiOutlineCoffee,
    },
    {
      name: "Promotion List",
      link: "/audit/reports/employee/promotion",
      Icon: AiOutlineCarryOut,
    },
  ],
};
