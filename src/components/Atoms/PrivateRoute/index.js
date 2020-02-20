import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectToken } from "states/auth/selectors";

const PrivateRoute = ({ children, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {};

const mapStateToProps = createStructuredSelector({
  token: selectToken()
});

export default connect(mapStateToProps)(PrivateRoute);
