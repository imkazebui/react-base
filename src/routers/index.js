/* eslint-disable react/jsx-filename-extension */
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
        // eslint-disable-next-line react/no-array-index-key
        <Route {...rest} key={`id-${idx}`} element={<Component />} />
      )
  );
};

export default renderRoutes;
