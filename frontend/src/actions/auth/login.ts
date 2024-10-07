'use server';

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false,
        });

        return 'Success';

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Credenciales incorrectas, por favor revisa!';
                default:
                    return 'Credenciales incorrectas, por favor revisa!';
            }
        }
        throw error;
    }
}