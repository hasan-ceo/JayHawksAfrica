import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));

const PartyList = lazy(() => import("./settings/party/PartyList"));
const PartyAdd = lazy(() => import("./settings/party/PartyAdd"));
const PartyEdit = lazy(() => import("./settings/party/PartyEdit"));

const ExpenseList = lazy(() => import("./settings/expense/ExpenseList"));
const ExpenseAdd = lazy(() => import("./settings/expense/ExpenseAdd"));
const ExpenseEdit = lazy(() => import("./settings/expense/ExpenseEdit"));

const BankList = lazy(() => import("./settings/bank/BankList"));
const BankAdd = lazy(() => import("./settings/bank/BankAdd"));
const BankEdit = lazy(() => import("./settings/bank/BankEdit"));

const ForexList = lazy(() => import("./settings/forex/ForexList"));
const ForexAdd = lazy(() => import("./settings/forex/ForexAdd"));
const ForexEdit = lazy(() => import("./settings/forex/ForexEdit"));

const LocationList = lazy(() => import("./settings/location/LocationList"));
const LocationAdd = lazy(() => import("./settings/location/LocationAdd"));
const LocationEdit = lazy(() => import("./settings/location/LocationEdit"));

const ProjectList = lazy(() => import("./settings/project/ProjectList"));
const ProjectAdd = lazy(() => import("./settings/project/ProjectAdd"));
const ProjectEdit = lazy(() => import("./settings/project/ProjectEdit"));

const MainHeadList = lazy(() => import("./settings/mainHead/MainHeadList"));
const MainHeadAdd = lazy(() => import("./settings/mainHead/MainHeadAdd"));
const MainHeadEdit = lazy(() => import("./settings/mainHead/MainHeadEdit"));

const SubHeadList = lazy(() => import("./settings/subHead/SubHeadList"));
const SubHeadAdd = lazy(() => import("./settings/subHead/SubHeadAdd"));
const SubHeadEdit = lazy(() => import("./settings/subHead/SubHeadEdit"));

const Settings = lazy(() => import("./settings/Settings"));

const PaymentVoucherList = lazy(() =>
  import("./paymentVoucher/PaymentVoucherList")
);
const PaymentVoucherAdd = lazy(() =>
  import("./paymentVoucher/PaymentVoucherAdd")
);

const ReceiveVoucherList = lazy(() =>
  import("./receiveVoucher/ReceiveVoucherList")
);
const ReceiveVoucherAdd = lazy(() =>
  import("./receiveVoucher/ReceiveVoucherAdd")
);

const PaymentToPartyList = lazy(() =>
  import("./paymentToParty/PaymentToPartyList")
);
const PaymentToPartyAdd = lazy(() =>
  import("./paymentToParty/PaymentToPartyAdd")
);

const ReceiveFromPartyList = lazy(() =>
  import("./receiveFromParty/ReceiveFromPartyList")
);
const ReceiveFromPartyAdd = lazy(() =>
  import("./receiveFromParty/ReceiveFromPartyAdd")
);

const JournalVoucherList = lazy(() =>
  import("./journalVoucher/JournalVoucherList")
);
const JournalVoucherAdd = lazy(() =>
  import("./journalVoucher/JournalVoucherAdd")
);

const TransferVoucherList = lazy(() =>
  import("./transferVoucher/TransferVoucherList")
);
const TransferVoucherAdd = lazy(() =>
  import("./transferVoucher/TransferVoucherAdd")
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

const SaccoList = lazy(() => import("./sacco/SaccoList"));
const SaccoAdd = lazy(() => import("./sacco/SaccoAdd"));
const TravelingBillRecommended = lazy(() =>
  import("./travelingBill/TravelingBillRecommended")
);
const TravelingBillComments = lazy(() =>
  import("./travelingBill/TravelingBillComments")
);

export {
  Dashboard,
  PaymentVoucherList,
  PaymentVoucherAdd,
  ReceiveVoucherList,
  ReceiveVoucherAdd,
  PaymentToPartyList,
  PaymentToPartyAdd,
  ReceiveFromPartyList,
  ReceiveFromPartyAdd,
  JournalVoucherList,
  JournalVoucherAdd,
  TransferVoucherList,
  TransferVoucherAdd,
  RequisitionApproveList,
  RequisitionApproveAdd,
  PartyList,
  PartyAdd,
  PartyEdit,
  ExpenseList,
  ExpenseAdd,
  ExpenseEdit,
  BankList,
  BankAdd,
  BankEdit,
  ForexList,
  ForexAdd,
  ForexEdit,
  LocationList,
  LocationAdd,
  LocationEdit,
  ProjectList,
  ProjectAdd,
  ProjectEdit,
  MainHeadList,
  MainHeadAdd,
  MainHeadEdit,
  SubHeadList,
  SubHeadAdd,
  SubHeadEdit,
  LedgerList,
  LedgerAdd,
  LedgerEdit,
  Settings,
  SaccoList,
  SaccoAdd,
  TravelingBillRecommended,
  TravelingBillComments
};
