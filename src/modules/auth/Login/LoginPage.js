import React from 'react';
import { Form, Col } from 'antd';

import { FormInput, FormButton } from 'components/Molecules';

import { useAuth } from '../index';

import './styles.scss';

const Login = () => {
  const { onSubmit } = useAuth();

  return (
    <div id="login-page">
      <Col span="6" className="login-wrapper">
        <h1>Login</h1>
        <Form layout="vertical" onFinish={onSubmit}>
          <FormInput formProps={{ label: 'Username', name: 'email' }} />
          <FormInput
            formProps={{ label: 'Password', name: 'password' }}
            type="password"
          />
          <FormButton type="primary" htmlType="submit">
            Submit
          </FormButton>
        </Form>
      </Col>
    </div>
  );
};

export default Login;
