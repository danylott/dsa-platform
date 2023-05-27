import Link from 'next/link';
import { Modal } from 'antd';
import React from 'react';

type SetLoading = (value: boolean) => void;

interface Props {
  isVisible: boolean;
  setModalVisible: SetLoading;
}

export default function ConfirmSignUpPopuUp(
  { isVisible, setModalVisible }: Props,
) {
  return (
    <Modal
      open={isVisible}
      className='rounded-2xl'
      onCancel={() => setModalVisible(false)}
      footer={null}
    >
      <div className='text-2xl flex justify-center items-center'>
        <p className='text-center'>
          You successfully created an accont - please proceed to
          <Link href='/auth/signin'> log in</Link>
          {' '}
          to continue.
          <br />
          Feel free to close this tab.
        </p>
      </div>
    </Modal>
  );
}
