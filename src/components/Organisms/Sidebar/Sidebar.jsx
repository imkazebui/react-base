/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-unstable-nested-components */
import React, { Fragment, useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { CaretDownOutlined, CaretUpOutlined, RightOutlined } from '@ant-design/icons';
import Icon from 'components/Atoms/Icon';

import { removeDuplicatesArray } from 'utilities/array';
import { useProfile } from 'modules/auth/queries';
import menu from './menu';
import { checkValidRole } from './utilities';

import './styles.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  const location = useLocation();
  const { data: userInfo } = useProfile();

  const [menuSelected, setMenuSelected] = useState({
    selectKey: [],
    openKey: [],
  });

  useEffect(() => {
    let temp = { ...menuSelected, selectKey: [] };
    const { pathname } = location;
    for (const item of menu) {
      if (item.path === pathname || pathname.includes(item?.path?.replace(':id', ''))) {
        temp = {
          selectKey: [item.name || item.parentName],
          openKey: [...menuSelected.openKey],
        };
        break;
      }
      if (item.children?.length) {
        for (const itemSub of item.children) {
          if (itemSub.path === pathname || pathname.includes(itemSub?.path.replace(':id', ''))) {
            temp = {
              selectKey: [itemSub.parentName || itemSub.name],
              openKey: [...menuSelected.openKey, item.name],
            };
            break;
          }
        }
      }
    }
    setMenuSelected({
      ...temp,
      openKey: removeDuplicatesArray(temp.openKey),
    });
  }, [location]);

  const renderMenuItem = (data, isSub) => {
    if (
      !data.showMenu ||
      !checkValidRole({
        userInfo,
        roles: data.roles,
        condition: data.condition,
        isPrivate: true,
        defaultShow: data.defaultShow || false,
      })
    ) {
      return null;
    }
    return (
      <Fragment key={data.path}>
        <Menu.Item
          key={data.name}
          icon={<Icon component={isSub ? RightOutlined : data.icon} className="my-menu-icon" />}
        >
          <Link to={data.path}>{data.name}</Link>
        </Menu.Item>

        {data.hasBorderBt && <div className="border-bt" />}
      </Fragment>
    );
  };

  const renderSubMenu = (data) => (
    <SubMenu
      key={data.name}
      icon={<Icon component={data.icon} className="my-menu-icon" />}
      title={data?.name}
    >
      {data.children.map((d) => renderMenuItem(d, true))}
    </SubMenu>
  );

  const renderMenu = () => (
    <Menu
      selectedKeys={menuSelected.selectKey}
      openKeys={menuSelected.openKey}
      mode="inline"
      id="sidebar-menu-custom"
      onOpenChange={(openKeys) => setMenuSelected({ ...menuSelected, openKey: openKeys })}
      expandIcon={({ isOpen }) => (
        <div className="d-inline-block f-right">
          {isOpen ? (
            <CaretUpOutlined className="icon-expand" />
          ) : (
            <CaretDownOutlined className="icon-expand" />
          )}
        </div>
      )}
    >
      {menu.map((m) => {
        if (m.children) {
          return renderSubMenu(m);
        }
        return renderMenuItem(m);
      })}
    </Menu>
  );

  return (
    <Sider id="site-sidebar" trigger={null} collapsible collapsed={false}>
      <div className="logo" />
      {renderMenu()}
    </Sider>
  );
};

export default Sidebar;
