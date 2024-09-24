// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken?: string;
        refreshToken?: string;
        user: {
            id: string;
            name: string;
            email: string;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        accessToken?: string;
        refreshToken?: string;
    }

    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        id: string;
        name: string;
        email: string;
    }
}
