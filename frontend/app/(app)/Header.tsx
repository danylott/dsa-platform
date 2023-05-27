'use client';

import { Button, Layout } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import { useCallback } from 'react';

const { Header } = Layout;

export default function HeaderComponent() {
  const { data: session } = useSession();

  const signOutClick = useCallback(async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await signOut();
  }, []);

  return (
    // Cannot provide tailwind bg-white here - not working with antd
    <Header style={{ backgroundColor: 'white' }}>
      Hi,
      {' '}
      {session?.user?.email}
      !
      <Button
        type='primary'
        className='mt-4 float-right'
        onClick={signOutClick}
      >
        Sign Out
      </Button>
    </Header>
  );
}
