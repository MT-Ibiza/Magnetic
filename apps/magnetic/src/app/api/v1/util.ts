import { decodeJwtAccessToken } from 'apps/magnetic/src/app/libs/jwt';

export function getTokenFromRequest(request: Request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  const decodedToken = token ? decodeJwtAccessToken(token) : null;
  return decodedToken;
}
