import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/layout/Layout";
import * as Acct from "./index";

const acctRoutes = (
  <Route path="/*" element={<PrivateRoute />}>
    <Route element={<Layout />}>
      <Route path="accounts" element={<Acct.Dashboard />} />
      <Route path="ac/sacco/withdraw/list" element={<Acct.SaccoList />} />
      <Route path="ac/sacco/withdraw" element={<Acct.SaccoAdd />} />
      <Route
        path="ac/paymentVoucher/list"
        element={<Acct.PaymentVoucherList />}
      />
      <Route
        path="ac/paymentVoucher/add"
        element={<Acct.PaymentVoucherAdd />}
      />
      <Route
        path="ac/receiveVoucher/list"
        element={<Acct.ReceiveVoucherList />}
      />
      <Route
        path="ac/receiveVoucher/add"
        element={<Acct.ReceiveVoucherAdd />}
      />
      <Route
        path="ac/paymentParty/list"
        element={<Acct.PaymentToPartyList />}
      />
      <Route path="ac/paymentParty/add" element={<Acct.PaymentToPartyAdd />} />
      <Route
        path="ac/receiveParty/list"
        element={<Acct.ReceiveFromPartyList />}
      />
      <Route
        path="ac/receiveParty/add"
        element={<Acct.ReceiveFromPartyAdd />}
      />
      <Route
        path="ac/journalVoucher/list"
        element={<Acct.JournalVoucherList />}
      />
      <Route
        path="ac/journalVoucher/add"
        element={<Acct.JournalVoucherAdd />}
      />
      <Route
        path="ac/transferVoucher/list"
        element={<Acct.TransferVoucherList />}
      />
      <Route
        path="ac/transferVoucher/add"
        element={<Acct.TransferVoucherAdd />}
      />
      <Route
        path="ac/requisitionApprove/list"
        element={<Acct.RequisitionApproveList />}
      />
      <Route
        path="ac/requisitionApprove/add"
        element={<Acct.RequisitionApproveAdd />}
      />
      <Route path="ac/settings/ledger/list" element={<Acct.LedgerList />} />
      <Route path="ac/settings/ledger/add" element={<Acct.LedgerAdd />} />
      <Route path="ac/settings/ledger/edit/:id" element={<Acct.LedgerEdit />} />
      <Route path="ac/settings/location/list" element={<Acct.LocationList />} />
      <Route path="ac/settings/location/add" element={<Acct.LocationAdd />} />
      <Route
        path="ac/settings/location/edit/:id"
        element={<Acct.LocationEdit />}
      />

      <Route path="ac/settings/project/list" element={<Acct.ProjectList />} />
      <Route path="ac/settings/project/add" element={<Acct.ProjectAdd />} />
      <Route
        path="ac/settings/project/edit/:id"
        element={<Acct.ProjectEdit />}
      />

      <Route path="ac/settings/mainhead/list" element={<Acct.MainHeadList />} />
      <Route path="ac/settings/mainhead/add" element={<Acct.MainHeadAdd />} />
      <Route
        path="ac/settings/mainhead/edit/:id"
        element={<Acct.MainHeadEdit />}
      />

      <Route path="ac/settings/subhead/list" element={<Acct.SubHeadList />} />
      <Route path="ac/settings/subhead/add" element={<Acct.SubHeadAdd />} />
      <Route
        path="ac/settings/subhead/edit/:id"
        element={<Acct.SubHeadEdit />}
      />

      <Route path="ac/settings/forex/list" element={<Acct.ForexList />} />
      <Route path="ac/settings/forex/add" element={<Acct.ForexAdd />} />
      <Route path="ac/settings/forex/edit/:id" element={<Acct.ForexEdit />} />

      <Route path="ac/settings/party/list" element={<Acct.PartyList />} />
      <Route path="ac/settings/party/add" element={<Acct.PartyAdd />} />
      <Route path="ac/settings/party/edit/:id" element={<Acct.PartyEdit />} />

      <Route path="ac/settings/expense/list" element={<Acct.ExpenseList />} />
      <Route path="ac/settings/expense/add" element={<Acct.ExpenseAdd />} />
      <Route
        path="ac/settings/expense/edit/:id"
        element={<Acct.ExpenseEdit />}
      />

      <Route path="ac/settings/bank/list" element={<Acct.BankList />} />
      <Route path="ac/settings/bank/add" element={<Acct.BankAdd />} />
      <Route path="ac/settings/bank/edit/:id" element={<Acct.BankEdit />} />

      <Route path="ac/settings" element={<Acct.Settings />} />
      <Route
        path="ac/travelingBill/recommended"
        element={<Acct.TravelingBillRecommended />}
      />
      <Route
        path="ac/traveling/recommended/comments/:id"
        element={<Acct.TravelingBillComments />}
      />
    </Route>
  </Route>
);

export default acctRoutes;
