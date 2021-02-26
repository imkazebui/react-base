import React, { useMemo } from 'react';
import { Input as InputAntd } from 'antd';

const Input = ({ type, ...rest }) => {
  let Component = useMemo(() => {
    switch (type) {
      case 'password':
        return InputAntd.Password;

      default:
        return InputAntd;
    }
  }, [type]);

  return <Component {...rest} />;
};

export default Input;
