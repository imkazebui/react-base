import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from 'react-router-dom';
import { Button, Result, Layout, Menu } from 'antd';
import PropTypes from 'prop-types';

import renderRoutes from 'routers/render';
import { Sidebar, Header } from 'components/Organisms';

import './styles.scss';

const { Content } = Layout;

const PrivateLayout = () => {
  let history = useHistory();

  return (
    <Layout id="private-layout">
      <Sidebar />
      <Layout id="site-layout">
        <Header />
        <Content id="site-content">
          <Switch>
            {renderRoutes(true)}

            <Redirect from="/" to="/login" />

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
        </Content>
      </Layout>
    </Layout>
  );
};

PrivateLayout.propTypes = {};

export default PrivateLayout;
