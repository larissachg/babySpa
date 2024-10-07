import NextAuth, { User, type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { AdapterUser } from 'next-auth/adapters';
import axios from 'axios';
import { ApiResponseInterface, AuthInterface } from './interfaces';
import { ApiRoutes } from './constantes';

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
                const { data } = await axios.post<ApiResponseInterface<AuthInterface>>(ApiRoutes.AUTH.LOGIN, {
                    "Usuario": usuario,
                    "Password": password
                })

                if (!data.success) return data.message;

                return data.data?.user;
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
    }
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)