import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        signOut: "/login",
        error: "/login"
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const res = await fetch(`${process.env.API}/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password,
                    }),
                });

                const { payload } = await res.json();

                if (!res.ok) {
                    throw new Error(payload.message || "Login failed");
                }

                return {
                    id: payload.user.id,
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
