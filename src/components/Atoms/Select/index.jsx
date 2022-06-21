/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Select as AntdSelect } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';
import './styles.scss';

const Select = ({ fullWidth, ...props }) => {
  const className = cn({
    'custom-select': true,
    'full-width': fullWidth,
  });

  return <AntdSelect {...props} className={className} />;
};

Select.propTypes = {
  fullWidth: PropTypes.bool,
};

export default Select;
