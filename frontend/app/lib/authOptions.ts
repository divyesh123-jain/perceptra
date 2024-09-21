import { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
          if (url.startsWith(baseUrl)) {
            return Promise.resolve('/dashboard');
          }
          return baseUrl;
        },
    }
}