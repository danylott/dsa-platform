'use client';

import Link from 'next/link';
import {
  Button,
  Form,
  InputNumber,
  Select,
  Slider,
  Switch,
} from 'antd';
import { SmileFilled } from '@ant-design/icons';

const FormItem = Form.Item;

export default function Home() {
  return (
    <div className='m-10'>
      <div className='text-center mb-5'>

        <Link href='/' className='m-0'>
          <SmileFilled className='text-5xl' />
        </Link>

        <p className='m-1'>Welcome to the world !</p>
        <Link href='/api/auth/signin'>
          <Button>
            Sign in Here!
          </Button>
        </Link>
        <br />
        <br />
        <h1>Here are some pretty elements for you :)</h1>
        <h2>
          P.S: Instead of this page - it will be a
          landing page here (different service)!
        </h2>
      </div>

      <Form
        layout='horizontal'
        size='large'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
      >
        <FormItem label='Input Number'>
          <InputNumber
            min={1}
            max={10}
            className='w-16'
            defaultValue={3}
            name='inputNumber'
          />
        </FormItem>

        <FormItem label='Switch'>
          <Switch defaultChecked />
        </FormItem>

        <FormItem label='Slider'>
          <Slider defaultValue={70} />
        </FormItem>

        <FormItem label='Select'>
          <Select
            defaultValue='lucy'
            className='w-24'
            options={[
              {
                value: 'jack',
                label: 'Jack',
              },
              {
                value: 'lucy',
                label: 'Lucy',
              },
              {
                value: 'disabled',
                disabled: true,
                label: 'Disabled',
              },
              {
                value: 'Yiminghe',
                label: 'yiminghe',
              },
            ]}
          />
        </FormItem>

        <FormItem className='m-8' wrapperCol={{ offset: 8 }}>
          <Button type='primary' htmlType='submit'>
            OK
          </Button>
          <Button className='m-1'>Cancel</Button>
        </FormItem>
      </Form>
    </div>
  );
}
