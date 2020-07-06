import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import { Button, Result } from 'antd';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectToken } from 'states/auth/selectors';
import { logout, getUserInfo } from 'states/auth/actions';

import renderRoutes from 'routers/render';

const PrivateLayout = ({ token, logout, getUserInfo }) => {
  let history = useHistory();

  useEffect(() => {
    getUserInfo({
      name: 'Kaze',
      roles: ['admin'],
    });
  }, [token]);

  const handleClickLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <div>
      {/* <header  />*/}
      {/* <side bar /> */}
      {/* <main /> */}
      <button onClick={handleClickLogout}>logout</button>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/other-page'>other-page</Link>
        </li>
        <li>
          <Link to='/other-page-1'>other-page-1</Link>
        </li>
      </ul>
      <Switch>
        {renderRoutes(true)}

        <Route path='*'>
          <Result
            status='404'
            title='PAGE NOT FOUND'
            subTitle='Sorry, the page you visited does not exist.'
            extra={
              <Button type='primary' onClick={() => history.replace('/')}>
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

const mapStateToProps = createStructuredSelector({
  token: selectToken(),
});

const mapDispatchToProps = {
  logout,
  getUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateLayout);
