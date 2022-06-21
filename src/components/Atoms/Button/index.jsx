/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Button as ButtonAntd } from 'antd';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './styles.scss';

const Button = ({ className, children, ...rest }) => (
  <ButtonAntd className={classnames('button-wrapper', className)} {...rest}>
    {children}
  </ButtonAntd>
);

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Button;
