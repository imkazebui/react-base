import React from 'react';
import AntIcon from '@ant-design/icons';
import PropTypes from 'prop-types';

const Icon = ({ component, ...rest }) => {
  return <AntIcon component={component} {...rest} />;
};

Icon.propTypes = {
  component: PropTypes.element,
};

export default Icon;

// export { ReactComponent as ArrowUp } from 'assets/images/icons/ArrowUp.svg';
// export { ReactComponent as ArrowUpIcon } from 'assets/images/icons/ArrowUpIcon.svg';
