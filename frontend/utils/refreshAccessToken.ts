import jwtDecode from 'jwt-decode';
import { post } from '@/utils/requests';
import Token from '@/interfaces/Token';

export async function refreshAccessToken(token: Token) {
  return null;
  // TODO: fix & test refreshing token
  try {
    const response = await post({
      url: '/api/jwt/refresh/',
      data: { refresh: token.refresh },
    });
    const refreshedToken = await response.json();

    if (response.status !== 200) {
      throw refreshedToken;
    }

    const { exp } = jwtDecode<Token>(refreshedToken.access);

    return {
      ...token,
      ...refreshedToken,
      exp,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
