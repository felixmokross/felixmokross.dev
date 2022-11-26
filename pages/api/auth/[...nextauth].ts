import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";
import { BlogSession } from "../../../common/types";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        // @ts-ignore
        token.login = profile.login;
      }
      return token;
    },
    async session({ session, token }) {
      const blogSession = session as BlogSession;
      blogSession.login = token.login as string;
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
