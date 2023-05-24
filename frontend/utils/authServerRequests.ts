import { getServerSession } from 'next-auth';
import { get } from '@/utils/requests';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Session from '@/interfaces/Session';

export async function getAuthServer(url: string) {
  const session: Session | null = await getServerSession(authOptions);

  return get({
    url: `${process.env.SERVER_SIDE_BACKEND_API_URL || ''}${url}`,
    headers: {
      Authorization: `Bearer ${session?.access}`,
      Host: 'frontend',
    },
    fullUrl: true,
  });
}
