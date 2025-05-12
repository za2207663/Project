import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/repo";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
        role: {},
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            username: credentials.username,
            password: credentials.password,
            role: credentials.role,
          },
        });

        if (user) return user;
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
   async jwt({ token, user, account }) {
  if (user) {
    token.role = user.role || "google";
    token.email = user.email;
  }
  return token;
}
,
   async session({ session, token }) {
  if (token) {
    session.user.role = token.role;
    session.user.email = token.email; // make sure it's passed to the session
  }
  return session;
}
,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
