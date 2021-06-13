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
  let routes = routeObj[routeType];
  let Route = RouteDom;

  return routes.map(
    ({ component: Component, roles, ...rest }, idx) =>
      checkValidRole(roles, userRole) && (
        <Route
          {...rest}
          key={idx}
          render={(props) => <Component {...props} />}
        />
      )
  );
};

export default renderRoutes;
