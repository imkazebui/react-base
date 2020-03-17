import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToken } from "states/auth/selectors";
import { login } from "states/auth/actions";
import PropTypes from "prop-types";

import { Button, Input } from "components/Atoms";

import "./styles.scss";

const OtherPage = props => {
  return (
    <div className="other-page">
      <p>other page</p>
    </div>
  );
};

OtherPage.propTypes = {};

export default OtherPage;
