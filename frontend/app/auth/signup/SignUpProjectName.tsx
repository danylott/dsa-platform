import { Form, Input } from 'antd';
import React from 'react';

export default function SignUpProjectName() {
  return (
    <Form.Item
      name='project_name'
      rules={[
        { required: true, message: 'Please input your project name!' },
      ]}
    >
      <Input placeholder='Project name' />
    </Form.Item>
  );
}
