
import CredentialsProvider  from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"

export const authConfig: NextAuthOptions = {
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

                const postRequest = await fetch("/api/login", {
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
};