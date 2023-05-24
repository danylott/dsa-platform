import { Button, Form, Spin } from 'antd';
import React from 'react';

interface Props {
  loading: boolean;
}

export default function SignUpButton(
  { loading }: Props,
) {
  return (
    <Form.Item wrapperCol={{ span: 24 }}>
      <div className='flex justify-center mt-5'>
        {loading
          ? (
            <Spin />
          )
          : (
            <>
              <Button type='primary' htmlType='submit'>
                Sign Up
              </Button>
            </>
          )}
      </div>
    </Form.Item>
  );
}
