const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const ApiRoutes = {
    AUTH: {
        LOGIN: `${backendUrl}/users/login`,
    },
}