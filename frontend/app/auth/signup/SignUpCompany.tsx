import { Form, Input } from 'antd';
import React from 'react';

export default function SignUpCompany() {
  return (
    <Form.Item
      name='company'
      rules={[
        { required: true, message: 'Please input your company name!' },
      ]}
    >
      <Input placeholder='Company name' />
    </Form.Item>
  );
}
