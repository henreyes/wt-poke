
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
                if(!credentials || !credentials.username || !credentials.password){
                    return null;
                } 
                return null;
        
            },
        }),

        
    ],
};