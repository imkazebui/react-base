/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import { Input } from 'components/Atoms';

const FormInput = ({ formProps, ...rest }) => (
  <Form.Item {...formProps}>
    <Input {...rest} />
  </Form.Item>
);

FormInput.propTypes = {
  formProps: PropTypes.object,
};

export default FormInput;
