import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/layout/Layout";
import * as ModAudit from "./index";

const auditRoutes = (
  <Route path="/*" element={<PrivateRoute />}>
    <Route element={<Layout />}>
      <Route path="audit" element={<ModAudit.Dashboard />} />
      <Route path="audit/closeList" element={<ModAudit.CloseList />} />
      <Route path="audit/list" element={<ModAudit.CreationList />} />
      <Route path="audit/add" element={<ModAudit.CreationAdd />} />
      <Route path="audit/edit/:id" element={<ModAudit.CreationEdit />} />

      <Route
        path="audit/settings/inherentrisk/list"
        element={<ModAudit.AuditInherentRiskList />}
      />
      <Route
        path="audit/settings/inherentrisk/add"
        element={<ModAudit.AuditInherentRiskAdd />}
      />
      <Route
        path="audit/settings/inherentrisk/edit/:id"
        element={<ModAudit.AuditInherentRiskEdit />}
      />

      <Route
        path="audit/settings/residualrisk/list"
        element={<ModAudit.AuditResidualRiskList />}
      />
      <Route
        path="audit/settings/residualrisk/add"
        element={<ModAudit.AuditResidualRiskAdd />}
      />
      <Route
        path="audit/settings/residualrisk/edit/:id"
        element={<ModAudit.AuditResidualRiskEdit />}
      />

      <Route
        path="audit/settings/weightage/list"
        element={<ModAudit.AuditWeightageList />}
      />
      <Route
        path="audit/settings/weightage/add"
        element={<ModAudit.AuditweightageAdd />}
      />
      <Route
        path="audit/settings/weightage/edit/:id"
        element={<ModAudit.AuditweightageEdit />}
      />

      <Route
        path="audit/settings/area/list"
        element={<ModAudit.AuditAreaList />}
      />
      <Route
        path="audit/settings/area/add"
        element={<ModAudit.AuditAreaAdd />}
      />
      <Route
        path="audit/settings/area/edit/:id"
        element={<ModAudit.AuditAreaEdit />}
      />

      <Route
        path="audit/settings/question/add"
        element={<ModAudit.AuditQuestionAdd />}
      />
      <Route
        path="audit/settings/question/list"
        element={<ModAudit.AuditQuestionList />}
      />
      <Route
        path="audit/settings/question/edit/:id"
        element={<ModAudit.AuditQuestionEdit />}
      />

      <Route
        path="audit/settings/teststeps/add"
        element={<ModAudit.AuditTestStepsAdd />}
      />
      <Route
        path="audit/settings/teststeps/list"
        element={<ModAudit.AuditTestStepsList />}
      />
      <Route
        path="audit/settings/teststeps/edit/:id"
        element={<ModAudit.AuditTestStepsEdit />}
      />

      <Route
        path="audit/closeObservations/:id"
        element={<ModAudit.CloseObservationsList />}
      />
      <Route
        path="audit/observations/:id"
        element={<ModAudit.ObservationsList />}
      />
      <Route
        path="audit/observations/add/:id"
        element={<ModAudit.ObservationsAdd />}
      />
      <Route
        path="audit/observations/edit/:id"
        element={<ModAudit.ObservationsEdit />}
      />
      <Route path="audit/checklist/:id" element={<ModAudit.Checklist />} />
      <Route path="audit/preview/:id" element={<ModAudit.Preview />} />

      <Route
        path="audit/checkdetails/:id/:areaId"
        element={<ModAudit.Step />}
      />

      <Route path="audit/settings" element={<ModAudit.Settings />} />

      <Route
        path="audit/settings/auditYear"
        element={<ModAudit.AuditYearOpen />}
      />
      <Route
        path="audit/workplanSummary/edit/:id"
        element={<ModAudit.AuditSummaryEdit />}
      />
      <Route
        path="audit/workplanSummary/list"
        element={<ModAudit.AuditSummaryList />}
      />
      <Route
        path="audit/workplan/add"
        element={<ModAudit.AuditWorkplanAdd />}
      />
      <Route
        path="audit/workplan/edit/:id"
        element={<ModAudit.AuditWorkplanEdit />}
      />
      <Route
        path="audit/workplan/list"
        element={<ModAudit.AuditWorkplanList />}
      />
      <Route
        path="audit/meetingMinutes/edit/:id"
        element={<ModAudit.MeetingMinutesEdit />}
      />
      <Route
        path="audit/amRmMonitoring/edit/:id"
        element={<ModAudit.AuditWorkStepEdit />}
      />

      <Route
        path="audit/settings/previousdata/list"
        element={<ModAudit.PreviousYearBranch />}
      />
      <Route
        path="audit/settings/previousdata/add"
        element={<ModAudit.PreviousYearBranchAdd />}
      />
      <Route
        path="audit/settings/previousdata/fileUpload"
        element={<ModAudit.PreviousYearBranchFileUpload />}
      />

      <Route path="audit/planning" element={<ModAudit.AuditPlan />} />

      <Route
        path="audit/planning/details/edit/:id"
        element={<ModAudit.AuditPlaningDetailsEdit />}
      />
      {/* Report  */}

      <Route
        path="audit/settings/departmentAuditTest/list"
        element={<ModAudit.DepartmentAuditTestList />}
      />
      <Route
        path="audit/settings/departmentAuditTest/add"
        element={<ModAudit.DepartmentAuditTestAdd />}
      />
      <Route
        path="audit/settings/departmentAuditTest/edit/:id"
        element={<ModAudit.DepartmentAuditTestEdit />}
      />

      <Route
        path="audit/settings/specialInvestigation/list"
        element={<ModAudit.SpecialInvestigationList />}
      />
      <Route
        path="audit/settings/specialInvestigation/add"
        element={<ModAudit.SpecialInvestigationAdd />}
      />
      <Route
        path="audit/settings/specialInvestigation/edit/:id"
        element={<ModAudit.SpecialInvestigationEdit />}
      />

      <Route
        path="audit/investigation/list"
        element={<ModAudit.InvestigationList />}
      />
      <Route
        path="audit/investigation/add"
        element={<ModAudit.InvestigationAdd />}
      />
      <Route
        path="audit/investigation/edit/:id"
        element={<ModAudit.InvestigationEdit />}
      />
      <Route
        path="audit/investigation/details/:id"
        element={<ModAudit.InvestigationDetails />}
      />

      <Route
        path="audit/investigation/details/edit/:id/"
        element={<ModAudit.InvestigationDetailsEdit />}
      />
      <Route
        path="audit/departmentalInvestigationreport/list"
        element={<ModAudit.DepartmentalInvestigationList />}
      />
      <Route
        path="audit/departmentalInvestigation/add"
        element={<ModAudit.DepartmentalInvestigationAdd />}
      />
      <Route
        path="audit/departmentalInvestigation/edit/:id"
        element={<ModAudit.DepartmentalInvestigationEdit />}
      />

      <Route
        path="audit/departmentalInvestigation/details/:id"
        element={<ModAudit.DepartmentalInvestigationDetails />}
      />

      <Route
        path="audit/departmentalInvestigation/details/edit/:id/"
        element={<ModAudit.DepartmentalInvestigationDetailsEdit />}
      />

      <Route
        path="audit/auditDepartmentReport/list"
        element={<ModAudit.AuditDepartmentReportList />}
      />
      <Route
        path="audit/auditDepartmentReport/add"
        element={<ModAudit.AuditDepartmentReportAdd />}
      />
      <Route
        path="audit/auditBranchDepartmentAuditReport/edit/:id"
        element={<ModAudit.AuditDepartmentReportEdit />}
      />

      <Route
        path="audit/auditSpecialInvestigationReport/list"
        element={<ModAudit.AuditSpecialInvestigationReportList />}
      />
      <Route
        path="audit/auditSpecialInvestigationReport/add"
        element={<ModAudit.AuditSpecialInvestigationReportAdd />}
      />
      <Route
        path="audit/AuditSpecialInvestigationAuditReport/edit/:id"
        element={<ModAudit.AuditSpecialInvestigationReportEdit />}
      />

      {/* audit Report  */}

      <Route path="audit/planning/submenu" element={<ModAudit.Planning />} />
      <Route path="audit/othersAudit" element={<ModAudit.OthersAudit />} />
      <Route path="audit/execution" element={<ModAudit.Execution />} />
      <Route path="audit/reporting" element={<ModAudit.Reporting />} />
    </Route>
  </Route>
);

export default auditRoutes;
