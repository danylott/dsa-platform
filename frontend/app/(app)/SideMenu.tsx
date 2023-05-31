'use client';

import { Layout, Menu } from 'antd';
import {
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const { Sider } = Layout;

export default function SideMenu() {
  return (
    <Sider>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '/tasks',
            icon: <UnorderedListOutlined />,
            label: <Link href='/tasks'>Tasks</Link>,
          },
          {
            key: '/profile',
            icon: <UserOutlined />,
            label: <Link href='/profile'>User Profile</Link>,
          },
        ]}
      />
    </Sider>
  );
}
