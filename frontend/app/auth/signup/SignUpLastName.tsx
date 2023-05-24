import { Form, Input } from 'antd';
import React from 'react';

export default function SignUpLastName() {
  return (
    <Form.Item
      name='last_name'
      rules={[
        { required: true, message: 'Please input your last name!' },
      ]}
    >
      <Input placeholder='Last name' />
    </Form.Item>
  );
}
