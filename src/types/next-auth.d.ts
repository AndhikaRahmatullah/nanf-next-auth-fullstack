import NextAuth from 'next-auth';

// --------------------------------------------------------------------------------------

declare module 'next-auth' {
  interface User {
    email: string;
    username: string | null;
  }

  interface Session {
    user: User & {
      username: string | null;
    };
    token: {
      username: string | null;
    };
  }
}
