import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/layout/Layout";
import * as User from "./index";

const userRoutes = (
  <Route path="/*" element={<PrivateRoute />}>
    <Route element={<Layout />}>
      <Route path="dashboard" element={<User.Dashboard />} />
      <Route path="my/team" element={<User.MyTeam />} />
      <Route path="training" element={<User.MyTraining />} />
      <Route path="applications/leave" element={<User.LeavePending />} />
      <Route
        path="applications/leave/comments/:id"
        element={<User.LeaveComments />}
      />
      <Route
        path="my/disciplinary/letter"
        element={<User.MyDisciplinaryLetterList />}
      />
      <Route
        path="my/disciplinary/letter/preview/:id"
        element={<User.MyDisciplinaryLetterPreview />}
      />
      <Route path="my/saccostatement" element={<User.SaccoStatement />} />
      <Route path="my/payslip" element={<User.PaySlip />} />
      <Route path="my/leave" element={<User.LeaveList />} />
      <Route path="my/leave/add" element={<User.LeaveAdd />} />
      <Route path="my/feedback" element={<User.FeedbackList />} />
      <Route path="my/feedback/add" element={<User.FeedbackAdd />} />
      <Route path="my/feedback/note/:id" element={<User.FeedbackNoteList />} />
      <Route path="notice/list" element={<User.NoticeList />} />
      <Route path="my/details" element={<User.MyDetails />} />
      <Route path="my/password/Reset" element={<User.MyPasswordReset />} />

      <Route path="evaluation" element={<User.Evaluations />} />
      <Route path="my/evaluation/list" element={<User.MyEvaluationList />} />
      <Route path="my/evaluation/add" element={<User.MyEvaluationAdd />} />
      <Route
        path="my/evaluation/edit/:id"
        element={<User.MyEvaluationEdit />}
      />
      <Route
        path="my/evaluation/details/:id"
        element={<User.MyEvaluationDetails />}
      />

      <Route
        path="my/evaluationSix/details/:id"
        element={<User.MyEvaluationDetailsSixMonths />}
      />
      <Route
        path="my/evaluationThree/details/:id"
        element={<User.MyEvaluationDetailsThreeMonths />}
      />
      <Route
        path="my/evaluation/pending/view/:id"
        element={<User.MyEvaluationPendingView />}
      />

      <Route
        path="my/evaluationSix/pending/view/:id"
        element={<User.MyEvaluationPendingViewSixMonths />}
      />
      <Route
        path="my/evaluationThree/pending/view/:id"
        element={<User.MyEvaluationPendingViewThreeMonths />}
      />

      <Route
        path="evaluation/first/Review/list"
        element={<User.EvaluationFirstReviewList />}
      />
      <Route
        path="evaluation/first/review/details/:id"
        element={<User.EvaluationFirstReviewDetailsInfo />}
      />
      <Route
        path="evaluationThree/first/review/details/:id"
        element={<User.EvaluationThreeFirstReviewDetailsInfo />}
      />
      <Route
        path="evaluationSix/first/review/details/:id"
        element={<User.EvaluationSixFirstReviewDetailsInfo />}
      />
      <Route
        path="evaluation/second/review/list"
        element={<User.EvaluationSecondReviewList />}
      />
      <Route
        path="evaluation/second/review/details/:id"
        element={<User.EvaluationSecondReviewDetails />}
      />
      <Route
        path="evaluationThree/second/review/details/:id"
        element={<User.EvaluationThreeSecondReviewDetails />}
      />
      <Route
        path="evaluationSix/second/review/details/:id"
        element={<User.EvaluationSixSecondReviewDetails />}
      />

      <Route
        path="evaluation/reports/complete"
        element={<User.EvaluationReportsComplete />}
      />
      <Route
        path="evaluationThree/reports/complete"
        element={<User.EvaluationThreeReportsComplete />}
      />
      <Route
        path="evaluationSix/reports/complete"
        element={<User.EvaluationSixReportsComplete />}
      />
      <Route
        path="evaluation/reports/complete/view/:id"
        element={<User.EvaluationReportsCompleteView />}
      />
      <Route
        path="evaluationThree/reports/complete/view/:id"
        element={<User.EvaluationThreeReportsCompleteView />}
      />
      <Route
        path="evaluationSix/reports/complete/view/:id"
        element={<User.EvaluationSixReportsCompleteView />}
      />
      <Route
        path="evaluation/reports/summary"
        element={<User.EvaluationReportsSummary />}
      />
      <Route
        path="evaluation/reports/reject/:id"
        element={<User.EvaluationReportsReject />}
      />
      <Route path="my/deviceregister" element={<User.DeviceRegisterList />} />
      <Route path="hr/feedback/note/:id" element={<User.FeedbackNoteList />} />
      <Route path="underconstruction" element={<User.UnderConstruction />} />

      <Route path="advanceSalary" element={<User.AdvanceSalary />} />
      <Route
        path="advanceSalary/myAdvanceSalary/add"
        element={<User.AdvanceSalaryAdd />}
      />
      <Route
        path="advanceSalary/myAdvanceSalary/list"
        element={<User.AdvanceSalaryList />}
      />
      <Route
        path="advanceSalary/recommendApplications"
        element={<User.RecommendApplications />}
      />
      <Route
        path="advanceSalary/recommendApplications/comments/:id"
        element={<User.AdvanceSalaryComments />}
      />
      <Route
        path="advanceSalary/view/:id"
        element={<User.AdvanceSalaryView />}
      />

      <Route path="transportBill" element={<User.TransportBill />} />

      <Route
        path="transportBill/received/list"
        element={<User.TransportBillReceived />}
      />

      <Route
        path="transportBill/received/details/:id"
        element={<User.TransportBillReceivedDetails />}
      />

      <Route path="transportBill/list" element={<User.TransportBillList />} />

      <Route path="transportBill/add" element={<User.TransportBillAdd />} />

      <Route
        path="transportBill/edit/:id"
        element={<User.TransportBillEdit />}
      />

      <Route
        path="transportBill/preview/:id"
        element={<User.TransportBillPreview />}
      />

      <Route
        path="transportBillDetails/list"
        element={<User.TransportBillDetailsList />}
      />
      <Route
        path="transportBillDetails/add/:id"
        element={<User.TransportBillDetailsAdd />}
      />

      <Route
        path="transportBillDetails/edit/:id"
        element={<User.TransportBillDetailsEdit />}
      />
      <Route
        path="transportBill/unpaid/list"
        element={<User.UnpaidTravelBillList />}
      />
      <Route
        path="transportBill/unpaid/preview/:id"
        element={<User.UnpaidTravelBillPreview />}
      />
      <Route path="ticket/list" element={<User.TicketList />} />
      <Route path="ticket/add" element={<User.TicketAdd />} />
      <Route path="ticket/edit/:id" element={<User.TicketEdit />} />
    </Route>
  </Route>
);

export default userRoutes;
