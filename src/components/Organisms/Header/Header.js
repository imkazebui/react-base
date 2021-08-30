import React from 'react';
import { Layout, Row, Col, Menu, Avatar } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useAuth } from 'modules/auth';

import './styles.scss';

const { SubMenu } = Menu;

const { Header: HeaderAntd } = Layout;

const AvataUser = () => {
  return (
    <>
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      Phuong Bui
    </>
  );
};

const Header = () => {
  const { handleLogout } = useAuth();
  return (
    <HeaderAntd id="site-header">
      <Row>
        <Col>
          {React.createElement(true ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: (f) => f,
          })}
        </Col>
        <Col flex="auto">
          <Row justify="end">
            <Menu mode="horizontal">
              <SubMenu key="SubMenu" title={<AvataUser />}>
                <Menu.ItemGroup title="Item 1">
                  <Menu.Item key="setting:1">Option 1</Menu.Item>
                  <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                  <Menu.Item key="setting:3">Option 3</Menu.Item>
                  <Menu.Item key="setting:4" onClick={handleLogout}>
                    Logout
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </Menu>
          </Row>
        </Col>
      </Row>
    </HeaderAntd>
  );
};

export default Header;
