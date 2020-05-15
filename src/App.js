import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PrivateRoute, LoadingScreen } from "components/Atoms";
import { PrivateLayout } from "components/Templates";
import renderRoutes from "routers/render";
import * as routeName from "routers/route-name";

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          {renderRoutes()}
          <PrivateRoute path="/" name={routeName.DASHBOARD}>
            <PrivateLayout />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
