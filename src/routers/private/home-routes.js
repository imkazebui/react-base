import React, { lazy } from "react";

import * as routePath from "../route-path";
import * as routeName from "../route-name";

const Dashboard = lazy(() => import("components/Pages/Dashboard"));

const routes = [
  {
    path: routePath.DASHBOARD,
    component: Dashboard,
    exact: true,
    name: routeName.DASHBOARD,
  },
];

export default routes;
