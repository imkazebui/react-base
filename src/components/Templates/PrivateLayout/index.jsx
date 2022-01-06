import React from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
import { Button, Result, Layout } from "antd";

import renderRoutes from "routers";
import { Sidebar, Header } from "components/Organisms";

import "./styles.scss";

const { Content } = Layout;

const PrivateLayout = () => {
  const navigate = useNavigate();

  return (
    <Layout id="private-layout">
      <Sidebar />
      <Layout id="site-layout">
        <Header />
        <Content id="site-content">
          <Routes>
            {renderRoutes("private-layout")}

            {/* <Route exact path="/">
                <Redirect to={routePath.TEAM} />
              </Route> */}

            <Route path="*">
              <Result
                status="404"
                title="PAGE NOT FOUND"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                  <Button type="primary" onClick={() => navigate("/")}>
                    Back Home
                  </Button>
                }
              />
            </Route>
            </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

PrivateLayout.propTypes = {};

export default PrivateLayout;
