import React from 'react';
import { Route as RouteDom } from 'react-router-dom';

import privateLayoutRoutes from './private-layout-routes';
import otherPrivateRoutes from './other-private-routes';
import publicRoutes from './public-routes';

const routeObj = {
  public: publicRoutes,
  'private-layout': privateLayoutRoutes,
  'other-private': otherPrivateRoutes,
};

const checkValidRole = (roles = [], useRole = '') =>
  roles.length > 0 ? roles.includes(useRole) : true;

const renderRoutes = (routeType = 'public', userRole = '') => {
  const routes = routeObj[routeType];
  const Route = RouteDom;

  return routes.map(
    ({ component: Component, roles, ...rest }, idx) =>
      checkValidRole(roles, userRole) && (
        <Route {...rest} key={idx} element={<Component />} />
      )
  );
};

export default renderRoutes;
