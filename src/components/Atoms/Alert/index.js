import { Alert as AlertAntd } from 'antd';
import React from 'react';

import './style.scss';

const Alert = ({ content, type, showIcon, icon, ...rest }) => {
  return (
    <AlertAntd
      className="alert-wrapper"
      message={content}
      type={type}
      showIcon={showIcon}
      icon={icon}
      {...rest}
    />
  );
};

export default Alert;
