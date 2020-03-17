import React from "react";
import { Button } from "antd";
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

import "./styles.scss";

const Dashboard = props => {
  return (
    <div className="dashboard">
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="link">Link</Button>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
