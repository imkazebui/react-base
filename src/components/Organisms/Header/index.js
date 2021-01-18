import React from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import './styles.scss';

const { Header: HeaderAntd } = Layout;

const Header = () => {
  return (
    <HeaderAntd id="site-header">
      {React.createElement(true ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: (f) => f,
      })}
    </HeaderAntd>
  );
};

export default Header;
