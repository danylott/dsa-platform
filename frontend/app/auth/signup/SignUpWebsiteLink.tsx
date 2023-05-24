import { Form, Input } from 'antd';
import React from 'react';

export default function SignUpWebsiteLink() {
  return (
    <Form.Item
      name='website_link'
      initialValue='https://'
      rules={[
        { required: true, message: 'Please input your project link!' },
      ]}
    >
      <Input />
    </Form.Item>
  );
}
