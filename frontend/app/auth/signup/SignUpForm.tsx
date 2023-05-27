import {
  Col, Form, FormInstance, Row,
} from 'antd';
import Link from 'next/link';
import React from 'react';
import SignUpFirstName
  from '@/app/auth/signup/SignUpFirstName';
import SignUpLastName
  from '@/app/auth/signup/SignUpLastName';
import SignUpEmail
  from '@/app/auth/signup/SignUpEmail';
import SignUpPassword
  from '@/app/auth/signup/SignUpPassword';
import SignUpConfirmPassword
  from '@/app/auth/signup/SignUpConfirmPassword';
import SignUpButton
  from '@/app/auth/signup/SignUpButton';

interface Props {
  form: FormInstance;
  onFinish: (values: any) => void;
  loading: boolean;
}

export default function SignUpForm({ form, onFinish, loading }: Props) {
  return (
    <Form
      form={form}
      name='basic'
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete='off'
    >
      <h1 className='text-center'>Sign Up</h1>

      <Row>
        <Col span={12}>
          <SignUpFirstName />
        </Col>

        <Col span={12}>
          <SignUpLastName />
        </Col>
      </Row>

      <SignUpEmail />

      <SignUpPassword />

      <SignUpConfirmPassword />

      <div>
        Already registered?
        <Link href='/auth/signin'>
          <div className='float-right'>Log in</div>
        </Link>
      </div>

      <SignUpButton loading={loading} />
    </Form>
  );
}
