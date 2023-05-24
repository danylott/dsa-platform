import 'next-auth';
import UserInterface from '@/interfaces/User';
import SessionInterface from '@/interfaces/Session';
import Token from '@/interfaces/Token';

declare module 'next-auth' {

  interface User extends UserInterface {}

  interface Session extends SessionInterface {}
}

declare module 'next-auth/jwt' {
  interface JWT extends Token {
    user: UserInterface;
  }
}
