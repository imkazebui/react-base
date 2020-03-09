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
import { logout } from "states/auth/actions";

const PrivateLayout = ({ token, logout }) => {
  let history = useHistory();

  useEffect(() => {
    console.log("get token");
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

const mapStateToProps = createStructuredSelector({
  token: selectToken()
});

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateLayout);
