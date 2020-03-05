import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { PrivateRoute } from "components/Atoms";
import { PrivateLayout } from "components/Templates";
import { LoginPage } from "components/Pages";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/">
          <PrivateLayout />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
