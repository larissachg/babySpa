export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const ApiRoutes = {
    BASE: backendUrl,
    AUTH: {
        LOGIN: `${backendUrl}/users/login`,
    },
    USERS: {
        GET: `${backendUrl}/users`,
    }
}