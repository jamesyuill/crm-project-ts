import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import connectDB from '@/mongo/connection';
import User from '@/mongo/models/UserModel';

type Credentials = {
  name: string;
  email: string;
  password: string;
};

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { type: 'text', placeholder: 'john' },
        email: { type: 'text', placeholder: 'test@test.com' },
        password: { type: 'password', placeholder: 'password' },
      },

      async authorize(credentials: Credentials) {
        const { email, password } = credentials;
        await connectDB();
        const user = User.findOne({ email });
        if (!user) return null;

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) return null;
        console.log(user);
        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/login' },
  callbacks: {
    session({ session, token }: any) {
      session.user.name =
        session.user.name.charAt(0).toUpperCase() + session.user.name.slice(1);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
