import { AiOutlineBank, AiOutlineSwap, AiOutlineSetting } from "react-icons/ai";
import { MdOutlineRequestQuote } from "react-icons/md";
export const menuAccounts = {
  menuData: [
    {
      name: "Sacco Withdraw",
      link: "/ac/sacco/withdraw/list",
      Icon: MdOutlineRequestQuote,
    },
  ],
  settingMenuData: [
    {
      name: "Settings",
      link: "/ac/settings",
      Icon: AiOutlineSetting,
    },
  ],
  subSettingMenuData: [
    {
      name: "Bank",
      link: "/ac/settings/bank/list",
      Icon: AiOutlineBank,
    },
    {
      name: "Forex",
      link: "/ac/settings/forex/list",
      Icon: AiOutlineSwap,
    },
  ],
};
