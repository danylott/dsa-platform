'use client';

import {
  Col, Form, notification, Row,
} from 'antd';
import React, { useCallback, useState } from 'react';
import { errorTemplate } from '@/utils/notifications';
import { post } from '@/utils/requests';
import ConfirmSignUpPopuUp
  from '@/app/auth/signup/ConfirmSignUpPopuUp';
import SignUpForm from '@/app/auth/signup/SignUpForm';

interface FormData {
  'first_name': string;
  'last_name': string;
  'company': string;
  'email': string;
  'password': string;
  'confirm': string;
}

export default function RegisterComponent() {
  const [loading, setLoading] = useState(false);
  const [notificationsApi, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  const onFinish = useCallback(async (values: FormData) => {
    setLoading(true);
    const response = await post({ url: '/api/users/', data: values });

    if (response.ok) {
      form.resetFields();
      setModalVisible(true);
      setLoading(false);

      return;
    }

    const data = await response.json();

    notificationsApi.error(
      errorTemplate(JSON.stringify(data)),
    );

    setLoading(false);
  }, [form, notificationsApi]);

  return (
    <>
      {contextHolder}
      <Row
        justify='center'
        align='middle'
        className='flex h-screen'
      >
        <Col span={8}>

          <SignUpForm
            form={form}
            onFinish={onFinish}
            loading={loading}
          />

          <ConfirmSignUpPopuUp
            isVisible={modalVisible}
            setModalVisible={setModalVisible}
          />

        </Col>
      </Row>
    </>
  );
}
