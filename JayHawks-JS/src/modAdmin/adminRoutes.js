import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/layout/Layout";
import * as Admin from "./index";

const adminRoutes = (
  <Route path="/*" element={<PrivateRoute />}>
    <Route element={<Layout />}>
      <Route path="admin" element={<Admin.Dashboard />} />
      <Route path="admin/settings" element={<Admin.Settings />} />
      <Route
        path="admin/settings/company/edit"
        element={<Admin.CompanyEdit />}
      />
      <Route
        path="admin/settings/division/list"
        element={<Admin.DivisionList />}
      />
      <Route
        path="admin/settings/division/add"
        element={<Admin.DivisionAdd />}
      />
      <Route
        path="admin/settings/division/edit/:id"
        element={<Admin.DivisionEdit />}
      />
      <Route path="admin/settings/region/list" element={<Admin.RegionList />} />
      <Route path="admin/settings/region/add" element={<Admin.RegionAdd />} />
      <Route
        path="admin/settings/region/edit/:id"
        element={<Admin.RegionEdit />}
      />
      <Route path="admin/settings/area/list" element={<Admin.AreaList />} />
      <Route path="admin/settings/area/add" element={<Admin.AreaAdd />} />
      <Route path="admin/settings/area/edit/:id" element={<Admin.AreaEdit />} />

      <Route path="admin/settings/branch/list" element={<Admin.BranchList />} />
      <Route path="admin/settings/branch/add" element={<Admin.BranchAdd />} />
      <Route
        path="admin/settings/branch/edit/:id"
        element={<Admin.BranchEdit />}
      />
      <Route
        path="admin/settings/holiday/list"
        element={<Admin.HolidayList />}
      />
      <Route path="admin/settings/holiday/add" element={<Admin.HolidayAdd />} />
      <Route
        path="admin/settings/holiday/edit/:id"
        element={<Admin.HolidayEdit />}
      />
      <Route path="admin/user" element={<Admin.UserList />} />
      <Route path="admin/user/edit/:id" element={<Admin.UserEdit />} />
      <Route path="admin/resign/list" element={<Admin.ResignList />} />
      <Route path="admin/user/add" element={<Admin.UserAdd />} />
      <Route path="admin/visitlist" element={<Admin.VisitList />} />
      <Route path="admin/ticket/report" element={<Admin.SettingsIssue />} />

      <Route
        path="admin/reports/ticket/open"
        element={<Admin.TicketOpenList />}
      />
      <Route
        path="admin/reports/ticket/close"
        element={<Admin.TicketClose />}
      />

      <Route path="admin/settings/category/list" element={<Admin.CategoryList />} />
      <Route path="admin/settings/category/add" element={<Admin.CategoryAdd />} />
      <Route path="admin/settings/category/edit/:id" element={<Admin.CategoryEdit />} />
    </Route>
  </Route>
);

export default adminRoutes;
