/* eslint-disable @nx/enforce-module-boundaries */
import NextAuth, { DefaultSession } from 'next-auth';
import { authOptions } from './auth-options';

declare module 'next-auth' {
  interface User {
    id: number; // fix error ts in authorize
  }
  interface Session {
    user: {
      id: number;
    } & DefaultSession['user'];
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
