'use client';

import React, { useState } from 'react';
import {
  Button, Col, Form, Input, notification, Row, Spin,
} from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { errorTemplate } from '@/utils/notifications';

export default function LoginComponent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notificationsApi, contextHolder] = notification.useNotification();

  async function onFinish(values: any) {
    setLoading(true);

    const signInResult = await signIn('credentials', { ...values, redirect: false });

    if (!signInResult?.ok) {
      notificationsApi.error(errorTemplate('Invalid credentials'));

      return;
    }

    router.push('/tasks');
  }

  return (
    <>
      {contextHolder}
      <Row
        justify='center'
        align='middle'
        className='flex'
        style={{ height: '100vh' }}
      >
        <Col span={8}>
          <Form
            name='basic'
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
          >
            <Row>
              <Col span={6} />
              <Col span={18}>
                <h1>Login:</h1>
              </Col>
            </Row>

            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                  type: 'email',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <div>
                Don&apos;t have an account yet?
                <Link href='/auth/signup' style={{ float: 'right' }}>
                  Sign Up
                </Link>
              </div>
              {loading
                ? (
                  <Spin className='mt-4' />
                )
                : (
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='mt-4'
                  >
                    Submit
                  </Button>
                )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
