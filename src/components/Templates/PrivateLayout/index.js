import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { selectToken } from "states/auth/selectors";
import { logout, getUserInfo } from "states/auth/actions";
import { PrivateRoute } from "components/Atoms";

export const routeName = {
  DASHBOARD: "DASHBOARD",
  OTHER_PAGE: "OTHER_PAGE",
  OTHER_PAGE_1: "OTHER_PAGE_1"
};

const PrivateLayout = ({ token, logout, getUserInfo }) => {
  let history = useHistory();

  useEffect(() => {
    getUserInfo({
      name: "Kaze",
      roles: ["admin"]
    });
  }, [token]);

  const handleClickLogout = () => {
    logout();
    history.push("/login");
  };

  return (
    <div>
      <button onClick={handleClickLogout}>logout</button>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/other-page">other-page</Link>
        </li>
        <li>
          <Link to="/other-page-1">other-page-1</Link>
        </li>
      </ul>
      <Switch>
        <PrivateRoute exact path="/other-page" name={routeName.OTHER_PAGE}>
          other page
        </PrivateRoute>
        <PrivateRoute exact path="/other-page-1" name={routeName.OTHER_PAGE_1}>
          other page 1
        </PrivateRoute>
        <PrivateRoute exact path="/" name={routeName.DASHBOARD}>
          dashboard
        </PrivateRoute>
        <Route path="*">No match</Route>
      </Switch>
    </div>
  );
};

PrivateLayout.propTypes = {};

const mapStateToProps = createStructuredSelector({
  token: selectToken()
});

const mapDispatchToProps = {
  logout,
  getUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateLayout);
