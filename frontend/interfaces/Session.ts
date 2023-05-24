import User from '@/interfaces/User';

export default interface Session {
  user: User;
  access: string;
  refresh: string;
  exp: number;
}
