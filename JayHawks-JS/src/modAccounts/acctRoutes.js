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
        path="ac/paymentVoucher/byBank"
        element={<Acct.PaymentVoucherByBank />}
      />
      <Route
        path="ac/paymentVoucher/byCash"
        element={<Acct.PaymentVoucherByCash />}
      />
      <Route
        path="ac/receiveVoucher/list"
        element={<Acct.ReceiveVoucherList />}
      />
      <Route
        path="ac/receiveVoucher/byBank"
        element={<Acct.ReceiveVoucherByBank />}
      />
      <Route
        path="ac/receiveVoucher/byCash"
        element={<Acct.ReceiveVoucherByCash />}
      />

      <Route
        path="ac/journalVoucher/list"
        element={<Acct.JournalVoucherList />}
      />

      <Route
        path="ac/incomeVoucher/list"
        element={<Acct.IncomeVoucherList />}
      />
      <Route
        path="ac/incomeVoucher/byBank"
        element={<Acct.IncomeVoucherByBank />}
      />
      <Route
        path="ac/incomeVoucher/byCash"
        element={<Acct.IncomeVoucherByCash />}
      />

      <Route
        path="ac/expenseVoucher/byCash"
        element={<Acct.ExpenseVoucherByCash />}
      />
      <Route
        path="ac/expenseVoucher/byBank"
        element={<Acct.ExpenseVoucherByBank />}
      />
      <Route
        path="ac/expenseVoucher/list"
        element={<Acct.ExpenseVoucherList />}
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
        path="ac/transferVoucher/BankToBank"
        element={<Acct.TransferBankToBank />}
      />

      <Route
        path="ac/transferVoucher/BankToCash"
        element={<Acct.TransferBankToCash />}
      />

      <Route
        path="ac/transferVoucher/CashToBank"
        element={<Acct.TransferCashToBank />}
      />

      <Route
        path="ac/transferVoucher/CashToCash"
        element={<Acct.TransferCashToCash />}
      />

      <Route
        path="ac/reverseVoucher/list"
        element={<Acct.ReverseVoucherList />}
      />
      <Route
        path="ac/reverseVoucher/add"
        element={<Acct.ReverseVoucherAdd />}
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

      <Route path="ac/settings/forex/list" element={<Acct.ForexList />} />
      <Route path="ac/settings/forex/add" element={<Acct.ForexAdd />} />
      <Route path="ac/settings/forex/edit/:id" element={<Acct.ForexEdit />} />

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

      <Route path="ac/settings/group/list" element={<Acct.GroupList />} />
      <Route path="ac/settings/group/add" element={<Acct.GroupAdd />} />
      <Route path="ac/settings/group/edit/:id" element={<Acct.GroupEdit />} />

      <Route path="ac/settings/subGroup/list" element={<Acct.SubGroupList />} />
      <Route path="ac/settings/subGroup/add" element={<Acct.SubGroupAdd />} />
      <Route
        path="ac/settings/subGroup/edit/:id"
        element={<Acct.SubGroupEdit />}
      />

      <Route
        path="ac/settings/subLedger/list"
        element={<Acct.SubLedgerList />}
      />
      <Route path="ac/settings/subLedger/add" element={<Acct.SubLedgerAdd />} />
      <Route
        path="ac/settings/subLedger/edit/:id"
        element={<Acct.SubLedgerEdit />}
      />
      <Route path="ac/reports/account" element={<Acct.Reports />} />
      <Route
        path="ac/report/balanceSheet"
        element={<Acct.BalanceSheetList />}
      />
      <Route path="ac/report/day/book" element={<Acct.DayBookReport />} />
      <Route path="ac/report/ledger" element={<Acct.LedgerReport />} />
      <Route
        path="ac/report/profitAndLoss"
        element={<Acct.ProfitAndLossAccountList />}
      />
      <Route
        path="ac/report/trial/balance"
        element={<Acct.TrialBalanceReport />}
      />
      <Route
        path="ac/report/ledgerBalance"
        element={<Acct.LedgerBalanceReport />}
      />
      <Route path="ac/report/bankbook" element={<Acct.BankBookReport />} />
      <Route path="ac/report/cashbook" element={<Acct.CashBookReport />} />

      <Route path="settings/day/close" element={<Acct.DayClose />} />
      {/* <Route path="settings/day/open" element={<Acct.DayOpen />} /> */}
      <Route path="settings/day/list" element={<Acct.DayOpen />} />

      <Route path="ac/settings/openning/list" element={<Acct.OpenningList />} />
      <Route path="ac/settings/openning/add" element={<Acct.OpenningAdd />} />
      <Route
        path="ac/settings/openning/edit/:id"
        element={<Acct.OpenningEdit />}
      />
    </Route>
  </Route>
);

export default acctRoutes;
