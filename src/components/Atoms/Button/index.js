import React, { useState } from 'react';
import { Button as ButtonAntd } from 'antd';
import classnames from 'classnames';
import './styles.scss';

const Button = ({ className, children, ...rest }) => {
  return (
    <ButtonAntd className={classnames('button-wrapper', className)} {...rest}>
      {children}
    </ButtonAntd>
  );
};

export default Button;
