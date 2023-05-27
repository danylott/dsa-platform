'use client';

import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from './Header';
import AuthContext from './AuthContext';
import SideMenu from './SideMenu';

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({
  children,
}: Props) {
  return (
    <AuthContext>
      <Layout hasSider className='flex h-screen overflow-hidden'>
        <SideMenu />
        <Layout className='site-layout'>
          <HeaderComponent />
          <Content className='m-4 p-4 text-center bg-white h-full overflow-y-scroll'>
            { children }
          </Content>
        </Layout>
      </Layout>
    </AuthContext>
  );
}
