import React from 'react';
import { getAuthServer } from '@/utils/authServerRequests';

interface Params {
  params: {
    chatId: string;
  };
}

export default async function TaskDetailPage({ params }: Params) {
  const { chatId } = params;

  await getAuthServer(`/api/users/telegram/${chatId}`);

  return (
    <>
      <h3>Successfully connected your account to Telegram Bot!</h3>
      <p>Thank you for using our service :)</p>
    </>
  );
}
