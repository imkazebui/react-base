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
import { selectToken, selectUserRoles } from "states/auth/selectors";

import { routeName } from "components/Templates/PrivateLayout";

const getRolesAccessRoute = name => {
  switch (name) {
    case routeName.DASHBOARD:
      return [];
    case routeName.OTHER_PAGE:
      return ["admin"];
    case routeName.OTHER_PAGE_1:
      return ["admin", "user"];
    default:
      return null;
  }
};

const PrivateRoute = ({ children, token, userRoles, name, ...rest }) => {
  console.log("name", name);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!token) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          );
        }

        let roleAccessRoute = getRolesAccessRoute(name);

        if (!roleAccessRoute) {
          return (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          );
        }

        if (roleAccessRoute.length == 0) {
          return children;
        }

        let isAccess = false;
        for (let i = 0; i < userRoles; i++) {
          if (roleAccessRoute.includes(userRoles[i])) {
            isAccess = true;

            i = userRoles.length;
          }
        }

        if (isAccess) {
          return children;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          );
        }
      }}
    />
  );
};

PrivateRoute.propTypes = {};

const mapStateToProps = createStructuredSelector({
  token: selectToken(),
  userRoles: selectUserRoles()
});

export default connect(mapStateToProps)(PrivateRoute);
