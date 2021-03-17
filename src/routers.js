import React from 'react';
import { Route as RouteDom } from 'react-router-dom';

import { loginRoutes } from 'modules/auth/routes';
import { staffRoutes } from 'modules/staffs/routes';

const publicRoutes = [...loginRoutes];
const privateRoutes = [...staffRoutes];

const checkValidRole = (roles = [], useRole = '') =>
  roles.length > 0 ? roles.includes(useRole) : true;

const renderRoutes = (isPrivate = false, userRole = '') => {
  let routes = publicRoutes;
  let Route = RouteDom;

  if (isPrivate) {
    routes = privateRoutes;
  }
  return routes.map(
    ({ component: Component, roles, ...rest }, idx) =>
      checkValidRole(roles, userRole) && (
        <Route {...rest} key={idx} render={(props) => <Component {...props} />}>
          <Component />
        </Route>
      )
  );
};

export default renderRoutes;
