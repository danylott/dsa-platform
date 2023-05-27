'use client';

import {
  Button, Col, Form, Input, notification, Row, Spin,
} from 'antd';
import React, { useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import { patch } from '@/utils/requests';
import { errorTemplate, infoTemplate } from '@/utils/notifications';

interface PasswordFormData {
  password: string;
}

export default function ChangePasswordComponent() {
  const [changePasswordForm] = Form.useForm();
  const [notificationsApi, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const handleFormSubmit = useCallback(async (values: PasswordFormData) => {
    setLoading(true);
    const response = await patch({ url: '/api/users/me/', data: values, token: session?.access });

    if (response.ok) {
      notificationsApi.info(infoTemplate('Password changed successfully'));
      setLoading(false);

      return;
    }

    const data = await response.json();

    notificationsApi.error(
      errorTemplate(JSON.stringify(data)),
    );

    setLoading(false);
  }, [notificationsApi, session?.access]);

  return (
    <>
      {contextHolder}
      <Row
        justify='center'
        align='top'
        className='flex'
      >
        <Col span={10}>
          <h2 className='text-left'>Change password</h2>
          <hr />
          <Form
            form={changePasswordForm}
            name='changePasswordForm'
            layout='vertical'
            wrapperCol={{ span: 24 }}
            autoComplete='off'
            onFinish={handleFormSubmit}
          >
            <Row>
              <Col span={12} className='p-2'>
                <Form.Item
                  label='New Password'
                  name='password'
                  rules={[
                    { message: 'Please input your new password' },
                  ]}
                >
                  <Input.Password placeholder='Write new password here' />
                </Form.Item>
              </Col>

              <Col span={12} className='p-2'>
                <Form.Item
                  label='Confirm New Password'
                  name='confirmPassword'
                  dependencies={['password']}
                  rules={[
                    { message: 'Please confirm your new password' },
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
                  <Input.Password placeholder='Confirm new password' />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item>
                  {loading
                    ? (
                      <Spin />
                    )
                    : (
                      <>
                        <Button type='primary' htmlType='submit'>Change Password</Button>
                      </>
                    )}
                </Form.Item>
              </Col>
            </Row>

          </Form>
        </Col>
      </Row>
    </>
  );
}
