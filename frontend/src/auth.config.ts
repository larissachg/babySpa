import NextAuth, { User, type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { AdapterUser } from 'next-auth/adapters';
import axios from 'axios';
import { ApiResponseInterface, AuthInterface } from './interfaces';
import { ApiRoutes } from './constantes';
import { cookies } from 'next/headers';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/login'
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ usuario: z.string(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { usuario, password } = parsedCredentials.data;

                // Add logic here to validate the credentials
                const { data, headers } = await axios.post<ApiResponseInterface<AuthInterface>>(ApiRoutes.AUTH.LOGIN, {
                    "Usuario": usuario,
                    "Password": password
                })

                if (!data.success) return null;

                const headerCookie = headers["set-cookie"];
                if (headerCookie) {
                    const token = headerCookie[0].split(";")[0].split("=")[1];
                    cookies().set({
                        name: 'Authentication',
                        value: token,
                        secure: true,
                        httpOnly: true,
                        sameSite: 'strict',
                        expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
                    })
                }

                return data.data as User;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.data = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.data as AdapterUser & {
                Nombre: string;
                Email?: string;
                Rol: string;
            } & User;
            return session;
        }
    },
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)