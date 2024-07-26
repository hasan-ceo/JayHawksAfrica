import { lazy } from "react";

const Landing = lazy(() => import("./landing/Landing"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ExitInterview = lazy(() => import("./pages/ExitInterview"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

export {
  Landing,
  ForgotPassword,
  ResetPassword,
  NotFound,
  ExitInterview,
  TermsOfService,
  PrivacyPolicy,
};
