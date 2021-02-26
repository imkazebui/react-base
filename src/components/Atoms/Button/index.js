import React from 'react';
import { Button as ButtonAntd } from 'antd';

const Button = ({ children, ...rest }) => {
  return <ButtonAntd {...rest}>{children}</ButtonAntd>;
};

export default Button;
