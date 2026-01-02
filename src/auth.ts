import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { LogainResponse } from "./lib/types/auth";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
        signOut: "/login",
        error:"/login"
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const res = await fetch(`${process.env.API}/auth/signin`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                });

                const payload: ApiResponse<LogainResponse> = await res.json();
                if ("code" in payload) {
                    throw new Error(payload.message);
                }

                return {
                    id: payload.user._id,
                    accessToken: payload.token,
                    user: payload.user,
                };
            },
        }),
    ],

    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.accessToken = user.accessToken;
                token.user = user.user;
            }
            return token;
        },
        session: ({ session, token }) => {
            session.user = token.user;
            return session;
        },
    },
};

export default NextAuth(authOptions);
