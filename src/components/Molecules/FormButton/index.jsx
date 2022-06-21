/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import { Button } from 'components/Atoms';

const FormButton = ({ formProps, ...rest }) => (
  <Form.Item {...formProps}>
    <Button {...rest} />
  </Form.Item>
);

FormButton.propTypes = {
  formProps: PropTypes.object,
};

export default FormButton;
