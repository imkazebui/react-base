import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToken } from "states/auth/selectors";
import { login } from "states/auth/actions";
import PropTypes from "prop-types";

import { Button, Input } from "components/Atoms";

import "./styles.scss";

const Login = ({ login }) => {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const onClickLogin = (e) => {
    login("token");

    history.replace(from);
  };

  return (
    <div className="login-page">
      <p>
        <FormattedMessage id="app.name" defaultMessage="default message" />
      </p>
      <p>You must log in to view the page at {from.pathname}</p>
      <Input />
      <Button name="login" onClick={onClickLogin} />
    </div>
  );
};

Login.propTypes = {};

const mapStateToProps = createStructuredSelector({
  token: selectToken(),
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
