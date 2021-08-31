import React, { memo, useCallback, useMemo, useState } from 'react';
import { Dropdown as DropdownAntd, Menu, Row } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const Dropdown = ({
  children,
  menu,
  onSelectItem,
  showIcon = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const _handleChangeView = useCallback(
    (value) => () => {
      onSelectItem(value);
      setIsOpen(false);
    },
    []
  );

  const overlay = useMemo(
    () => (
      <Menu>
        {menu.map((item) => (
          <Menu.Item
            key={item.key || item.value}
            onClick={_handleChangeView(item.value)}
          >
            {item.component}
          </Menu.Item>
        ))}
      </Menu>
    ),
    []
  );

  const renderIcon = useCallback(() => {
    if (!showIcon) {
      return null;
    }

    return isOpen ? <CaretUpOutlined /> : <CaretDownOutlined />;
  }, [showIcon, isOpen]);

  return (
    <DropdownAntd overlay={overlay} onVisibleChange={setIsOpen} {...props}>
      <Row justify="center" align="middle" gutter={15}>
        {children}
        {renderIcon()}
      </Row>
    </DropdownAntd>
  );
};

Dropdown.propTypes = {
  children: PropTypes.element,
  menu: PropTypes.array,
};

export default memo(Dropdown);
