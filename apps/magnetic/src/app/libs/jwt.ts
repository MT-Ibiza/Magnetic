import jwt, { JwtPayload } from 'jsonwebtoken';

interface SignOptions {
  expiresIn?: string | number;
}

const defaultSignOptions: SignOptions = {
  expiresIn: '48h',
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOptions = defaultSignOptions
) {
  return jwt.sign(payload, process.env.NEXTAUTH_SECRET as string, options);
}

export function verifyJwtAccessToken(token: string) {
  try {
    return jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    ) as JwtPayload;
  } catch (error) {
    console.log(error);
  }
}

export function decodeJwtAccessToken(token: string) {
  const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET as string);
  return decoded as {
    id: number;
    email: string;
    role: string;
    iat: number;
    exp: number;
  };
}
