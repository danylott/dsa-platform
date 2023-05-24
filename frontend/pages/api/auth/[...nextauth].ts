import NextAuth, { NextAuthOptions } from 'next-auth';
import jwtDecode from 'jwt-decode';
import CredentialsProvider from 'next-auth/providers/credentials';
import Token from '@/interfaces/Token';
import { refreshAccessToken } from '@/utils/refreshAccessToken';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({

      credentials: {},

      async authorize(credentials) {
        try {
          const response = await fetch(
            `${process.env.SERVER_SIDE_BACKEND_API_URL || ''}/api/jwt/create/`, {
              headers: {
                'content-type': 'application/json',
                Host: 'frontend',
              },
              method: 'POST',
              body: JSON.stringify(credentials),
            },
          );
          const token = await response.json();

          if (response.status !== 200) {
            throw token;
          }

          const {
            email, user_id, exp,
          } = jwtDecode<Token>(token.access);

          return {
            ...token,
            exp,
            user: {
              email,
              user_id,
            },
          };
        } catch (error) {

          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
    async jwt({
      token, user, account,
    }) {
      // initial signin
      if (account && user) {
        return user;
      }

      const millisecondsInSecond = 1000;

      // Return previous token if the access token has not expired
      if (Date.now() < token.exp * millisecondsInSecond) {
        return token;
      }

      // TODO: fix refresh token
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      return {
        user: token.user,
        access: token.access,
        refresh: token.refresh,
        exp: token.exp,
        expires: session.expires,
      };
    },
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
