import { Form, Input } from 'antd';
import React from 'react';

export default function SignUpConfirmPassword() {
  return (
    <Form.Item
      name='confirm'
      dependencies={['password']}
      rules={[
        {
          required: true,
          message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }

            return Promise.reject(
              new Error(
                'The two passwords that you entered do not match!',
              ),
            );
          },
        }),
      ]}
    >
      <Input.Password placeholder='Confirm password' />
    </Form.Item>
  );
}
