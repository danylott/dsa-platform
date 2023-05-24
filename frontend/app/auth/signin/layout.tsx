'use client';

import React from 'react';
import AuthContext from '@/app/[projectId]/AuthContext';

export default function LoginLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContext>
      { children }
    </AuthContext>
  );
}
