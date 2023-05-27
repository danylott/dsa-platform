'use client';

import {
  Button,
  Col, Form, Input, notification, Row, Spin,
} from 'antd';
import React, { useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import { errorTemplate, infoTemplate } from '@/utils/notifications';
import { patch } from '@/utils/requests';

interface PersonalInfoFormData {
  email: string;
  first_name: string;
  last_name: string;
}

export interface PersonalInformation {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
}

interface Props {
  userInfo: PersonalInformation;
}

export default function PersonalInformationComponent({
  userInfo,
}: Props) {
  const [personalInfoForm] = Form.useForm();
  const [notificationsApi, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const handleFormSubmit = useCallback(async (values: PersonalInfoFormData) => {
    setLoading(true);
    const response = await patch({ url: '/api/users/me/', data: values, token: session?.access });

    if (response.ok) {
      notificationsApi.info(infoTemplate('Updated successfully'));
      setLoading(false);

      return;
    }

    const data = await response.json();

    notificationsApi.error(
      errorTemplate(JSON.stringify(data)),
    );

    setLoading(false);
  }, [notificationsApi, session?.access]);

  const {
    email, first_name, last_name,
  } = userInfo;

  const initialValues = {
    email,
    first_name,
    last_name,
  };

  return (
    <>
      {contextHolder}
      <Row
        justify='center'
        align='top'
        className='flex mb-8'
      >
        <Col span={10}>
          <h2 className='text-left'>Personal Information</h2>
          <hr />
          <Form
            form={personalInfoForm}
            name='personalInfoForm'
            layout='vertical'
            wrapperCol={{ span: 24 }}
            initialValues={initialValues}
            autoComplete='off'
            onFinish={handleFormSubmit}
          >
            <Row>
              <Col span={12} className='p-1'>
                <Form.Item name='first_name' label='First Name'>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12} className='p-1'>
                <Form.Item name='last_name' label='Last Name'>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name='email' label='Email' className="p-2">
              <Input />
            </Form.Item>

            <Form.Item>
              {loading
                ? (
                  <Spin />
                )
                : (
                  <>
                    <Button type='primary' htmlType='submit'>Update Information</Button>
                  </>
                )}
            </Form.Item>

          </Form>
        </Col>
      </Row>
    </>
  );
}
