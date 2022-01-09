import { Alert as AlertAntd } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

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

Alert.propTypes = {
  content: PropTypes.string,
  type: PropTypes.string,
  showIcon: PropTypes.bool,
  icon: PropTypes.element,
};

export default Alert;
