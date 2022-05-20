import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.login = profile.login;
      }
      return token;
    },
    async session({ session, token }) {
      session.login = token.login;
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
