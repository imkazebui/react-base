import React from "react";
import { Route as RouteDom } from "react-router-dom";
import { PrivateRoute } from "components/Atoms";

import privateRoutes from "./private";
import publicRoutes from "./public";

const renderRoutes = (isPrivate = false) => {
  let routes = publicRoutes;
  let Route = RouteDom;

  if (isPrivate) {
    routes = privateRoutes;
    Route = PrivateRoute;
  }

  return routes.map(({ component: Component, ...rest }, idx) => (
    <Route {...rest} key={idx} render={(props) => <Component {...props} />}>
      <Component />
    </Route>
  ));
};

export default renderRoutes;
