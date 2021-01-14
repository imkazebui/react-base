import React, { lazy } from 'react';

import * as routePath from '../route-path';

const OtherPage = lazy(() => import('components/Pages/OtherPage'));

const routes = [
  {
    path: routePath.OTHER_PAGE,
    component: OtherPage,
    exact: true,
  },
];

export default routes;
