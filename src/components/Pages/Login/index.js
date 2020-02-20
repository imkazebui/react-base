import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToken } from "states/auth/selectors";
import { login } from "states/auth/actions";
import PropTypes from "prop-types";

import { Button, Input } from "components/Atoms";

const Login = ({ login }) => {
  const onClickLogin = e => {
    login("token");
    window.location.href = "/";
  };

  return (
    <div>
      <Input />
      <Button name="login" onClick={onClickLogin} />
    </div>
  );
};

Login.propTypes = {};

const mapStateToProps = createStructuredSelector({
  token: selectToken()
});

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
