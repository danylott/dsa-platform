import { Form, Input } from 'antd';
import React from 'react';

export default function SignUpEmail() {
  return (
    <Form.Item
      name='email'
      rules={[
        {
          required: true,
          message: 'Please input your email!',
          type: 'email',
        },
      ]}
    >
      <Input placeholder='Email' />
    </Form.Item>
  );
}
