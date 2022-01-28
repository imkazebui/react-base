import { Alert as AlertAntd } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Alert = ({ content, type, showIcon, ...rest }) => (
  <AlertAntd
    className="alert-wrapper"
    message={content}
    type={type}
    showIcon={showIcon}
    {...rest}
  />
);

Alert.propTypes = {
  content: PropTypes.string,
  type: PropTypes.string,
  showIcon: PropTypes.bool,
};

Alert.defaultProps = {
  content: 'default content',
  type: 'info',
  showIcon: true,
};

export default Alert;
