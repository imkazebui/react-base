import React from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import './styles.scss';

const { Sider } = Layout;

const Sidebar = () => {
  const history = useHistory();

  const onClick = (url) => () => history.push(url);

  return (
    <Sider id="site-sidebar" trigger={null} collapsible collapsed={false}>
      <div className="logo">NhatNguyet</div>

      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<UserOutlined />} onClick={onClick('/user')}>
          User
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<VideoCameraOutlined />}
          onClick={onClick('/detect')}
        >
          Detect History
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<UploadOutlined />}
          onClick={onClick('/report')}
        >
          Report
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
