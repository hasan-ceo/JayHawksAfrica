import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));

const SaccoList = lazy(() => import("./sacco/SaccoList"));
const SaccoAdd = lazy(() => import("./sacco/SaccoAdd"));

const ExpenseList = lazy(() => import("./settings/expense/ExpenseList"));
const ExpenseAdd = lazy(() => import("./settings/expense/ExpenseAdd"));
const ExpenseEdit = lazy(() => import("./settings/expense/ExpenseEdit"));

const BankList = lazy(() => import("./settings/bank/BankList"));
const BankAdd = lazy(() => import("./settings/bank/BankAdd"));
const BankEdit = lazy(() => import("./settings/bank/BankEdit"));

const ForexList = lazy(() => import("./settings/forex/ForexList"));
const ForexAdd = lazy(() => import("./settings/forex/ForexAdd"));
const ForexEdit = lazy(() => import("./settings/forex/ForexEdit"));

const Settings = lazy(() => import("./settings/Settings"));

const PaymentVoucherList = lazy(() =>
  import("./paymentVoucher/PaymentVoucherList")
);
const PaymentVoucherByBank = lazy(() =>
  import("./paymentVoucher/PaymentVoucherByBank")
);
const PaymentVoucherByCash = lazy(() =>
  import("./paymentVoucher/PaymentVoucherByCash")
);

const ReceiveVoucherList = lazy(() =>
  import("./receiveVoucher/ReceiveVoucherList")
);
const ReceiveVoucherByBank = lazy(() =>
  import("./receiveVoucher/ReceiveVoucherByBank")
);
const ReceiveVoucherByCash = lazy(() =>
  import("./receiveVoucher/ReceiveVoucherByCash")
);

const IncomeVoucherList = lazy(() =>
  import("./incomeVoucher/IncomeVoucherList")
);
const IncomeVoucherByBank = lazy(() =>
  import("./incomeVoucher/IncomeVoucherByBank")
);
const IncomeVoucherByCash = lazy(() =>
  import("./incomeVoucher/IncomeVoucherByCash")
);

const ExpenseVoucherList = lazy(() =>
  import("./expenseVoucher/ExpenseVoucherList")
);
const ExpenseVoucherByBank = lazy(() =>
  import("./expenseVoucher/ExpenseVoucherByBank")
);
const ExpenseVoucherByCash = lazy(() =>
  import("./expenseVoucher/ExpenseVoucherByCash")
);

const JournalVoucherList = lazy(() =>
  import("./journalVoucher/JournalVoucherList")
);
const JournalVoucherAdd = lazy(() =>
  import("./journalVoucher/components/JournalVoucher")
);

const TransferVoucherList = lazy(() =>
  import("./transferVoucher/TransferVoucherList")
);

const TransferBankToBank = lazy(() =>
  import("./transferVoucher/TransferBankToBank")
);

const TransferBankToCash = lazy(() =>
  import("./transferVoucher/TransferBankToCash")
);

const TransferCashToBank = lazy(() =>
  import("./transferVoucher/TransferCashToBank")
);

const TransferCashToCash = lazy(() =>
  import("./transferVoucher/TransferCashToCash")
);

const ReverseVoucherList = lazy(() =>
  import("./reverseVoucher/ReverseVoucherList")
);
const ReverseVoucherAdd = lazy(() =>
  import("./reverseVoucher/ReverseVoucherAdd")
);
const RequisitionApproveList = lazy(() =>
  import("./requisitionApprove/RequisitionApproveList")
);
const RequisitionApproveAdd = lazy(() =>
  import("./requisitionApprove/RequisitionApproveAdd")
);

const LedgerList = lazy(() => import("./settings/ledger/LedgerList"));
const LedgerAdd = lazy(() => import("./settings/ledger/LedgerAdd"));
const LedgerEdit = lazy(() => import("./settings/ledger/LedgerEdit"));

const SubLedgerAdd = lazy(() => import("./settings/subLedger/SubLedgerAdd"));
const SubLedgerList = lazy(() => import("./settings/subLedger/SubLedgerList"));
const SubLedgerEdit = lazy(() => import("./settings/subLedger/SubLedgerEdit"));

const GroupList = lazy(() => import("./settings/group/GroupList"));
const GroupAdd = lazy(() => import("./settings/group/GroupAdd"));
const GroupEdit = lazy(() => import("./settings/group/GroupEdit"));

const SubGroupList = lazy(() => import("./settings/subGroup/SubGroupList"));
const SubGroupAdd = lazy(() => import("./settings/subGroup/SubGroupAdd"));
const SubGroupEdit = lazy(() => import("./settings/subGroup/SubGroupEdit"));

const Reports = lazy(() => import("./reports/reports/Report"));

const BalanceSheetList = lazy(() =>
  import("./reports/reports/report/BalanceSheetList")
);
const DayBookReport = lazy(() =>
  import("./reports/reports/report/DayBookReport")
);
const TrialBalanceReport = lazy(() =>
  import("./reports/reports/report/TrialBalanceReport")
);
const LedgerReport = lazy(() =>
  import("./reports/reports/report/LedgerReport")
);
const ProfitAndLossAccountList = lazy(() =>
  import("./reports/reports/report/ProfitAndLossAccountList")
);

const LedgerBalanceReport = lazy(() =>
  import("./reports/reports/report/LedgerBalanceReport")
);

const BankBookReport = lazy(() =>
  import("./reports/reports/report/BankBookReport")
);
const CashBookReport = lazy(() =>
  import("./reports/reports/report/CashBookReport")
);

const OpenningList = lazy(() => import("./openning/OpenningList"));
const OpenningAdd = lazy(() => import("./openning/OpenningAdd"));
const OpenningEdit = lazy(() => import("./openning/OpenningEdit"));
const DayOpen = lazy(() => import("./settings/dayOpenClose/DayOpen"));
const DayClose = lazy(() => import("./settings/dayOpenClose/DayClose"));
const DayOpenList = lazy(() => import("./settings/dayOpenClose/DayOpenList"));
export {
  Dashboard,
  SaccoList,
  SaccoAdd,
  PaymentVoucherList,
  PaymentVoucherByBank,
  PaymentVoucherByCash,
  ReceiveVoucherList,
  ReceiveVoucherByBank,
  ReceiveVoucherByCash,
  IncomeVoucherList,
  IncomeVoucherByBank,
  IncomeVoucherByCash,
  ExpenseVoucherList,
  ExpenseVoucherByBank,
  ExpenseVoucherByCash,
  JournalVoucherList,
  JournalVoucherAdd,
  TransferVoucherList,
  TransferBankToBank,
  TransferBankToCash,
  TransferCashToBank,
  TransferCashToCash,
  ReverseVoucherList,
  ReverseVoucherAdd,
  RequisitionApproveList,
  RequisitionApproveAdd,
  ExpenseList,
  ExpenseAdd,
  ExpenseEdit,
  BankList,
  BankAdd,
  BankEdit,
  ForexList,
  ForexAdd,
  ForexEdit,
  LedgerList,
  LedgerAdd,
  LedgerEdit,
  Settings,
  GroupList,
  GroupAdd,
  GroupEdit,
  SubGroupList,
  SubGroupAdd,
  SubGroupEdit,
  SubLedgerAdd,
  SubLedgerList,
  SubLedgerEdit,
  Reports,
  BalanceSheetList,
  DayBookReport,
  LedgerReport,
  ProfitAndLossAccountList,
  TrialBalanceReport,
  LedgerBalanceReport,
  BankBookReport,
  CashBookReport,
  OpenningList,
  OpenningAdd,
  OpenningEdit,
  DayOpenList,
  DayOpen,
  DayClose,
};
