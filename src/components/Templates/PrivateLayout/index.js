import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateLayout = props => {
  return (
    <div>
      <button>logout</button>
      <Switch>
        <Route exact path="/">
          dashboard
        </Route>
        <Route exact path="/other-page">
          other page
        </Route>
        <Route exact path="/other-page-1">
          other page 1
        </Route>
        <Route path="*">No match</Route>
      </Switch>
    </div>
  );
};

PrivateLayout.propTypes = {};

export default PrivateLayout;
