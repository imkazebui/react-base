import React from 'react';
import { Select as AntdSelect } from 'antd';
import cn from 'classnames';

import './styles.scss';

const Select = ({ fullWidth, ...props }) => {
  const className = cn({
    'custom-select': true,
    'full-width': fullWidth,
  });

  return <AntdSelect {...props} className={className} />;
};

export default Select;
