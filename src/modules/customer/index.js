import React, { useEffect, useState } from 'react';
import axios from 'utilities/axios';
import { Form, Input, Button, message } from 'antd';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 8,
  },
};

const User = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState({
    emailPrimary: '',
    emailOptional: [],
    emailOptionalLengh: 0,
  });

  const getUserInfo = async () => {
    const { data } = await axios.get('/user');

    const dt = data.data[0];

    setData({ ...dt, emailOptionalLengh: dt.emailOptional.length });

    const emailOptional = dt.emailOptional.reduce((c, v, idx) => {
      c[`emailOptional${idx}`] = v;
      return c;
    }, {});

    form.setFieldsValue({
      emailPrimary: dt.emailPrimary,
      ...emailOptional,
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const onFinish = async ({ emailPrimary, ...optional }) => {
    await axios.put('/user', {
      emailPrimary,
      emailOptional: Object.values(optional).filter((o) => o !== ''),
    });

    message.success('User information has been successfully updated');
  };

  const handleAddEmail = () => {
    const newData = { ...data };
    newData.emailOptional.push('');
    setData(newData);
  };

  return (
    <>
      <h1>User info</h1>
      <Form {...layout} name="user-info" onFinish={onFinish} form={form}>
        <Form.Item label="Email Primary" name="emailPrimary">
          <Input readOnly />
        </Form.Item>

        {data.emailOptional.map((e, idx) => (
          <Form.Item
            key={idx}
            label={`Email Optional ${idx}`}
            name={`emailOptional${idx}`}
          >
            <Input />
          </Form.Item>
        ))}

        <Form.Item {...tailLayout}>
          <Button type="primary" onClick={handleAddEmail}>
            Add Email
          </Button>
          <p>{`      `}</p>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default User;
