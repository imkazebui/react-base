import React from 'react';
import { Route as RouteDom } from 'react-router-dom';

const privateRoutes = [];
const publicRoutes = [];

const renderRoutes = (isPrivate = false) => {
  let routes = publicRoutes;
  let Route = RouteDom;

  if (isPrivate) {
    routes = privateRoutes;
  }

  return routes.map(({ component: Component, ...rest }, idx) => (
    <Route {...rest} key={idx} render={(props) => <Component {...props} />}>
      <Component />
    </Route>
  ));
};

export default renderRoutes;
