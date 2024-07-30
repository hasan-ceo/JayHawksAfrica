import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Reports = lazy(() => import("./reports/Reports"));
const CloseList = lazy(() => import("./auditCreation/CloseList"));
const CreationList = lazy(() => import("./auditCreation/CreationList"));
const CreationAdd = lazy(() => import("./auditCreation/CreationAdd"));
const CreationEdit = lazy(() => import("./auditCreation/CreationEdit"));

const AuditAreaList = lazy(() => import("./settings/auditarea/AuditAreaList"));
const AuditAreaAdd = lazy(() => import("./settings/auditarea/AuditAreaAdd"));
const AuditAreaEdit = lazy(() => import("./settings/auditarea/AuditAreaEdit"));

const AuditQuestionList = lazy(() =>
  import("./settings/auditquestion/AuditQuestionList")
);
const AuditQuestionAdd = lazy(() =>
  import("./settings/auditquestion/AuditQuestionAdd")
);
const AuditQuestionEdit = lazy(() =>
  import("./settings/auditquestion/AuditQuestionEdit")
);

const AuditTestStepsList = lazy(() =>
  import("./settings/auditteststeps/AuditTestStepsList")
);
const AuditTestStepsAdd = lazy(() =>
  import("./settings/auditteststeps/AuditTestStepsAdd")
);
const AuditTestStepsEdit = lazy(() =>
  import("./settings/auditteststeps/AuditTestStepsEdit")
);

const CloseObservationsList = lazy(() =>
  import("./auditObservations/CloseObservationsList")
);
const ObservationsList = lazy(() =>
  import("./auditObservations/ObservationsList")
);
const ObservationsAdd = lazy(() =>
  import("./auditObservations/ObservationsAdd")
);
const ObservationsEdit = lazy(() =>
  import("./auditObservations/ObservationsEdit")
);
const Checklist = lazy(() => import("./auditChecklist/Checklist"));
const Preview = lazy(() => import("./auditChecklist/Preview"));
const Step = lazy(() => import("./auditCheckStep/Step"));
const StepOne = lazy(() => import("./auditCheckStep/StepOne"));
const StepTwo = lazy(() => import("./auditCheckStep/StepTwo"));
const StepThree = lazy(() => import("./auditCheckStep/StepThree"));
const StepFour = lazy(() => import("./auditCheckStep/StepFour"));
const StepFive = lazy(() => import("./auditCheckStep/StepFive"));
const StepSix = lazy(() => import("./auditCheckStep/StepSix"));
const StepSeven = lazy(() => import("./auditCheckStep/StepSeven"));
const StepEight = lazy(() => import("./auditCheckStep/StepEight"));
const StepNine = lazy(() => import("./auditCheckStep/StepNine"));
const StepTen = lazy(() => import("./auditCheckStep/StepTen"));
const StepEleven = lazy(() => import("./auditCheckStep/StepEleven"));
const StepTwelve = lazy(() => import("./auditCheckStep/StepTwelve"));
const StepThirteen = lazy(() => import("./auditCheckStep/StepThirteen"));
const StepFourteen = lazy(() => import("./auditCheckStep/StepFourteen"));
const StepFifteen = lazy(() => import("./auditCheckStep/StepFifteen"));
const StepSixteen = lazy(() => import("./auditCheckStep/StepSixteen"));
const StepSeventeen = lazy(() => import("./auditCheckStep/StepSeventeen"));

const Settings = lazy(() => import("./settings/Settings"));

const AuditYearOpen = lazy(() => import("./settings/auditYear/AuditYearOpen"));

const AuditSummaryEdit = lazy(() => import("./auditSummary/AuditSummaryEdit"));
const AuditSummaryList = lazy(() => import("./auditSummary/AuditSummaryList"));

const AuditWorkplanAdd = lazy(() => import("./auditWorkplan/AuditWorkplanAdd"));
const AuditWorkplanEdit = lazy(() =>
  import("./auditWorkplan/AuditWorkplanEdit")
);
const AuditWorkplanList = lazy(() =>
  import("./auditWorkplan/AuditWorkplanList")
);
const MeetingMinutesEdit = lazy(() =>
  import("./auditWorkSteps/entryExitMeeting/MeetingMinutesEdit")
);
const AuditWorkStepEdit = lazy(() =>
  import("./auditWorkSteps/auditWorkStep/AuditWorkStepEdit")
);

const AuditInherentRiskAdd = lazy(() =>
  import("./settings/auditInherentrisk/InherentRiskAdd")
);
const AuditInherentRiskEdit = lazy(() =>
  import("./settings/auditInherentrisk/InherentRiskEdit")
);
const AuditInherentRiskList = lazy(() =>
  import("./settings/auditInherentrisk/InherentRiskList")
);

const AuditResidualRiskAdd = lazy(() =>
  import("./settings/auditResidualrisk/ResidualRiskAdd")
);
const AuditResidualRiskEdit = lazy(() =>
  import("./settings/auditResidualrisk/ResidualRiskEdit")
);
const AuditResidualRiskList = lazy(() =>
  import("./settings/auditResidualrisk/ResidualRiskList")
);

const AuditweightageAdd = lazy(() =>
  import("./settings/auditWeightage/WeightageAdd")
);
const AuditweightageEdit = lazy(() =>
  import("./settings/auditWeightage/WeightageEdit")
);
const AuditWeightageList = lazy(() =>
  import("./settings/auditWeightage/WeightageList")
);

const PreviousYearBranch = lazy(() =>
  import("./settings/previousYearBranch/PreviousYearBranch")
);
const PreviousYearBranchAdd = lazy(() =>
  import("./settings/previousYearBranch/PreviousYearBranchAdd")
);
const PreviousYearBranchFileUpload = lazy(() =>
  import("./settings/previousYearBranch/PreviousYearBranchFileUpload")
);
const AuditPlan = lazy(() => import("./settings/auditPlaning/AuditPlan"));
const AuditPlaningDetailsEdit = lazy(() =>
  import("./settings/auditPlaning/AuditPlaningDetailsEdit")
);

// Report
const RptEmployeeList = lazy(() =>
  import("./reports/employeelist/EmployeeList")
);
const RptEmployeeResign = lazy(() =>
  import("./reports/employeelist/EmployeeResign")
);
const EmployeeResignDetails = lazy(() =>
  import("./reports/employeelist/resignDetails/Details")
);
const EmployeeDetails = lazy(() =>
  import("./reports/employeelist/employee/Details")
);
const RptEmployeeTransfer = lazy(() =>
  import("./reports/employeelist/EmployeeTransfer")
);
const RptEmployeeLeave = lazy(() =>
  import("./reports/employeelist/EmployeeLeave")
);
const RptEmployeePromotion = lazy(() =>
  import("./reports/employeelist/EmployeePromotion")
);

const DepartmentAuditTestAdd = lazy(() =>
  import("./settings/auditDepartmentAuditTest/DepartmentAuditTestAdd")
);
const DepartmentAuditTestEdit = lazy(() =>
  import("./settings/auditDepartmentAuditTest/DepartmentAuditTestEdit")
);
const DepartmentAuditTestList = lazy(() =>
  import("./settings/auditDepartmentAuditTest/DepartmentAuditTestList")
);

const SpecialInvestigationAdd = lazy(() =>
  import("./settings/auditSpecialInvestigation/SpecialInvestigationAdd")
);
const SpecialInvestigationEdit = lazy(() =>
  import("./settings/auditSpecialInvestigation/SpecialInvestigationEdit")
);
const SpecialInvestigationList = lazy(() =>
  import("./settings/auditSpecialInvestigation/SpecialInvestigationList")
);

const InvestigationAdd = lazy(() =>
  import("./specialInvestigation/InvestigationAdd")
);
const InvestigationEdit = lazy(() =>
  import("./specialInvestigation/InvestigationEdit")
);
const InvestigationList = lazy(() =>
  import("./specialInvestigation/InvestigationList")
);

const InvestigationDetailsEdit = lazy(() =>
  import(
    "./specialInvestigation/specialInvestigationDetails/InvestigationDetailsEdit"
  )
);
const InvestigationDetails = lazy(() =>
  import(
    "./specialInvestigation/specialInvestigationDetails/InvestigationDetails"
  )
);

const DepartmentalInvestigationDetailsEdit = lazy(() =>
  import(
    "./settings/departmentalInvestigation/departmentalInvestigationDetailsReport/DepartmentalInvestigationDetailsEdit"
  )
);
const DepartmentalInvestigationDetails = lazy(() =>
  import(
    "./settings/departmentalInvestigation/departmentalInvestigationDetailsReport/DepartmentalInvestigationDetails"
  )
);


const DepartmentalInvestigationAdd = lazy(() =>
  import("./settings/departmentalInvestigation/DepartmentalInvestigationAdd")
);
const DepartmentalInvestigationEdit = lazy(() =>
  import("./settings/departmentalInvestigation/DepartmentalInvestigationEdit")
);
const DepartmentalInvestigationList = lazy(() =>
  import("./settings/departmentalInvestigation/DepartmentalInvestigationList")
);

const AuditDepartmentReportAdd = lazy(() =>
  import("./auditDepartmentReport/AuditDepartmentReportAdd")
);
const AuditDepartmentReportEdit = lazy(() =>
  import("./auditDepartmentReport/AuditDepartmentReportEdit")
);
const AuditDepartmentReportList = lazy(() =>
  import("./auditDepartmentReport/AuditDepartmentReportList")
);
const AuditSpecialInvestigationReportAdd = lazy(() =>
  import("./auditSpecialInvestigationReport/AuditSpecialInvestigationReportAdd")
);
const AuditSpecialInvestigationReportEdit = lazy(() =>
  import("./auditSpecialInvestigationReport/AuditSpecialInvestigationReportEdit")
);
const AuditSpecialInvestigationReportList = lazy(() =>
  import("./auditSpecialInvestigationReport/AuditSpecialInvestigationReportList")
);


export {
  Dashboard,
  Reports,
  CloseList,
  CreationList,
  CreationAdd,
  CreationEdit,
  CloseObservationsList,
  ObservationsList,
  ObservationsAdd,
  ObservationsEdit,
  Checklist,
  Preview,
  Step,
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSix,
  StepSeven,
  StepEight,
  StepNine,
  StepTen,
  StepEleven,
  StepTwelve,
  StepThirteen,
  StepFourteen,
  StepFifteen,
  StepSixteen,
  StepSeventeen,
  Settings,
  AuditAreaList,
  AuditAreaAdd,
  AuditAreaEdit,
  AuditQuestionList,
  AuditQuestionAdd,
  AuditQuestionEdit,
  AuditTestStepsList,
  AuditTestStepsAdd,
  AuditTestStepsEdit,
  AuditYearOpen,
  AuditSummaryEdit,
  AuditSummaryList,
  AuditWorkplanAdd,
  AuditWorkplanEdit,
  AuditWorkplanList,
  MeetingMinutesEdit,
  AuditWorkStepEdit,
  AuditInherentRiskAdd,
  AuditInherentRiskEdit,
  AuditInherentRiskList,
  AuditResidualRiskAdd,
  AuditResidualRiskEdit,
  AuditweightageAdd,
  AuditweightageEdit,
  AuditWeightageList,
  PreviousYearBranch,
  PreviousYearBranchAdd,
  AuditResidualRiskList,
  PreviousYearBranchFileUpload,
  AuditPlan,
  AuditPlaningDetailsEdit,
  RptEmployeeList,
  RptEmployeeResign,
  RptEmployeeTransfer,
  RptEmployeeLeave,
  RptEmployeePromotion,
  EmployeeResignDetails,
  EmployeeDetails,
  SpecialInvestigationAdd,
  SpecialInvestigationEdit,
  SpecialInvestigationList,
  InvestigationAdd,
  InvestigationEdit,
  InvestigationList,
  InvestigationDetailsEdit,
  InvestigationDetails,
  DepartmentalInvestigationAdd,
  DepartmentalInvestigationEdit,
  DepartmentalInvestigationList,
  DepartmentalInvestigationDetailsEdit,
  DepartmentalInvestigationDetails,
  DepartmentAuditTestList,
  DepartmentAuditTestAdd,
  DepartmentAuditTestEdit,
  AuditDepartmentReportAdd,
  AuditDepartmentReportEdit,
  AuditDepartmentReportList,
  AuditSpecialInvestigationReportList,
  AuditSpecialInvestigationReportEdit,
  AuditSpecialInvestigationReportAdd,
};
