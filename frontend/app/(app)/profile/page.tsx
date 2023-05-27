import PersonalInformationComponent from '@/app/(app)/profile/PersonalInformationComponent';
import { getUserInformation } from '@/app/(app)/profile/utils';
import ChangePasswordComponent
  from '@/app/(app)/profile/ChangePasswordComponent';

export default async function ProfilePage() {
  const userInformation = await getUserInformation();

  return (
    <>
      <h1 className='text-2xl mb-8'>Manage your personal information</h1>
      <PersonalInformationComponent
        userInfo={userInformation}
      />
      <ChangePasswordComponent />
    </>
  );
}
