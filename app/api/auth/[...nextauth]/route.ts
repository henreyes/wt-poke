import NextAuth from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"

const authConfig: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "username",
                    placeholder: ""
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                const postRequest = await fetch("https://wtpoke.vercel.app/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password
                    }),
                });

                const user = await postRequest.json();

                if(user){
                    return user;
                } else {
                    return null;
                }
        
            },
        }),

        
    ],
    callbacks: {
        async jwt({token, user}){
            return { ...token, ...user};
        },

        async session({ session, token }) {
            session.user = token as any;
            return session;
        }
    }
};
const handler = NextAuth(authConfig)

export { handler as GET, handler as POST };