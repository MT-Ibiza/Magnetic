import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
import db from '../../../libs/db';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'your email' },
        password: { label: 'Password', type: 'password', placeholder: '*****' },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error('No credentials');
        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!userFound) throw new Error('No user found');

        // if (userFound.isValidated === false) {
        //   throw new Error('User not validated.');
        // }

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password || ''
        );

        if (!matchPassword) throw new Error('Wrong password');

        return {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: async ({ session, token }: { session: any; token: any }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async signIn({ user, account }: { user: any; account: any }) {
      const existingUser = await db.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (existingUser) {
        return true;
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {},
};
