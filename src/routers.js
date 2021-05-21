import React, { lazy } from 'react';
import { Route as RouteDom } from 'react-router-dom';

import { loginRoutes } from 'modules/auth/routes';
const DetectPage = lazy(() => import('modules/detect'));
const UserPage = lazy(() => import('modules/customer'));
const ReportPage = lazy(() => import('modules/report'));

const publicRoutes = [
  // {
  //   component: DetectPage,
  //   exact: true,
  //   path: '/',
  // },
  {
    component: UserPage,
    exact: true,
    path: '/mobile/user',
  },
  {
    component: ReportPage,
    exact: true,
    path: '/mobile/report',
  },
];
const privateRoutes = [
  {
    component: DetectPage,
    exact: true,
    path: '/',
  },
  {
    component: UserPage,
    exact: true,
    path: '/user',
  },
  {
    component: ReportPage,
    exact: true,
    path: '/report',
  },
];

const renderRoutes = (isPrivate = false, userRole = '') => {
  let routes = publicRoutes;
  let Route = RouteDom;

  if (isPrivate) {
    routes = privateRoutes;
  }
  return routes.map(({ component: Component, roles, ...rest }, idx) => (
    <Route
      {...rest}
      key={idx}
      render={(props) => <Component {...props} isMobile={!isPrivate} />}
    >
      <Component isMobile={!isPrivate} />
    </Route>
  ));
};

export default renderRoutes;
