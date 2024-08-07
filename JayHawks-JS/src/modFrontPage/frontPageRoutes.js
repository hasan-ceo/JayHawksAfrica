import { Route } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/layout/Layout";
import * as FrontPage from "./index";

const frontPageRoutes = (
  <Route path="/*" element={<PublicRoute />}>
    <Route element={<Layout />}>
      <Route path="" element={<FrontPage.Landing />} />
    </Route>
  </Route>
);

export default frontPageRoutes;
