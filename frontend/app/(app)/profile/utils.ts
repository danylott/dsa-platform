import { getAuthServer } from '@/utils/authServerRequests';
import {
  PersonalInformation,
} from '@/app/(app)/profile/PersonalInformationComponent';

export async function getUserInformation() {
  const res = await getAuthServer('/api/users/me/');

  const personalInformation: PersonalInformation = await res.json();

  return personalInformation;
}
