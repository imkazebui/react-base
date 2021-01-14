import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import { Button, Result } from 'antd';
import PropTypes from 'prop-types';

import renderRoutes from 'routers/render';

const PrivateLayout = ({ token, getUserInfo }) => {
  let history = useHistory();

  return (
    <div>
      {/* <header  />*/}
      {/* <side bar /> */}
      {/* <main /> */}

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
        {renderRoutes(true)}

        <Route path="*">
          <Result
            status="404"
            title="PAGE NOT FOUND"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <Button type="primary" onClick={() => history.replace('/')}>
                Back Home
              </Button>
            }
          />
        </Route>
      </Switch>
    </div>
  );
};

PrivateLayout.propTypes = {};

export default PrivateLayout;
