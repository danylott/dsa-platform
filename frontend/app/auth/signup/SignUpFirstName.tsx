import { Form, Input } from 'antd';
import React from 'react';

export default function SignUpFirstName() {
  return (
    <Form.Item
      name='first_name'
      rules={[
        {
          required: true,
          message: 'Please input your first name!',
        },
      ]}
    >
      <Input placeholder='First name' />
    </Form.Item>
  );
}
