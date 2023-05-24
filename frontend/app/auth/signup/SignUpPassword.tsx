import { Form, Input } from 'antd';
import React from 'react';

export default function SignUpPassword() {
  return (
    <Form.Item
      name='password'
      rules={[
        { required: true, message: 'Please input your password!' },
      ]}
    >
      <Input.Password placeholder='Password' />
    </Form.Item>
  );
}
