import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { cookies } from 'next/headers';

export const authOptions: NextAuthOptions = ({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user = {
                    ...session.user,
                    id: token.id as string,
                    name: token.name as string,
                    email: token.email as string,
                }
                session.accessToken = token.accessToken as string | undefined;
                session.refreshToken = token.refreshToken as string | undefined;
            }
            return session;
        },
        async signIn({ user, credentials, account }) {
            console.log(user, account)
            try {


                const response = await fetch('https://diasporex-api.vercel.app/api/v1/auth/social-login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: user.email,
                        imageUrl: user.image,
                        name: user.name,
                    }),
                });

                const { data } = await response.json();
                if (response.ok && data.accessToken && data.refreshToken) {
                    user.id = data.user.id
                    user.accessToken = data.accessToken;
                    user.refreshToken = data.refreshToken;
                    cookies().set('accessToken', data.accessToken);
                    cookies().set('refreshToken', data.refreshToken);
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                return false;
            }
        },
        async jwt({ token, user, account }) {

            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }

            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    pages: {
        signIn: '/',
        signOut: '/sign-in'
    },
    secret: process.env.NEXTAUTH_SECRET as string,
});
