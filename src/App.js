import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PrivateRoute } from "components/Atoms";
import { PrivateLayout } from "components/Templates";
import renderRoutes from "routers/render";
import * as routeName from "routers/route-name";

function App() {
  return (
    <Router>
      <Switch>
        {renderRoutes()}
        <PrivateRoute path="/" name={routeName.DASHBOARD}>
          <PrivateLayout />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
