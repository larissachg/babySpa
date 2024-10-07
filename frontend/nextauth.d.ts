import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            Nombre: string;
            Email?: string;
            Rol: string;
        } & DefaultSession['user'];
    }
}