import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import { db } from './db';

// --------------------------------------------------------------------------------------

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 10, // (seconds) expired if without activity
  },
  pages: { signIn: '/auth/sign-in' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const existingUserUsername = await db.user.findUnique({
          where: { username: credentials?.username },
        });

        if (!existingUserUsername) {
          return null;
        }

        const passwordMatch = await compare(credentials.password, existingUserUsername.password);

        if (!passwordMatch) {
          return null;
        }

        return {
          id: `${existingUserUsername.id}`,
          username: existingUserUsername.username,
          email: existingUserUsername.email,
          createdAt: existingUserUsername.createdAt,
          updatedAt: existingUserUsername.updatedAt,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username,
          email: user.email,
        };
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          email: token.email,
          username: token.username,
        },
        expires: `${Date.parse(session.expires)}`,
      };
    },
  },
};

export default NextAuth(authOptions);
