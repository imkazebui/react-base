import React, { lazy } from 'react';

import * as routePath from '../route-path';

const Dashboard = lazy(() => import('components/Pages/Dashboard'));

const routes = [
  {
    path: routePath.DASHBOARD,
    component: Dashboard,
    exact: true,
  },
];

export default routes;
