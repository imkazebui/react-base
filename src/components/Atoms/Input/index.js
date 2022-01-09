import React, { useMemo } from 'react';
import { Input as InputAntd } from 'antd';
import PropTypes from 'prop-types';

const Input = ({ type, ...rest }) => {
  const Component = useMemo(() => {
    switch (type) {
      case 'password':
        return InputAntd.Password;
      default:
        return InputAntd;
    }
  }, [type]);

  return <Component {...rest} />;
};

Input.propTypes = {
  type: PropTypes.string,
};

export default Input;
