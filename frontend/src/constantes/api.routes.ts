export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const ApiRoutes = {
  BASE: backendUrl,
  AUTH: {
    LOGIN: `${backendUrl}/users/login`,
  },
  USERS: {
    GET: `${backendUrl}/users`,
    POST: `${backendUrl}/users`,
    PUT: `${backendUrl}/users`,
  },
  PRODUCTS: {
    GET: `${backendUrl}/products`,
    POST: `${backendUrl}/products`,
    PUT: `${backendUrl}/products`,
  },
  SALES: {
    GET: `${backendUrl}/sales`,
  },
  CLIENTS: {
    GET: `${backendUrl}/clients`,
    POST: `${backendUrl}/clients`,
    PUT: `${backendUrl}/clients`,
  },
  APPOINTMENTS: {
    GET: `${backendUrl}/appointments`,
    POST: `${backendUrl}/appointments`,
    PUT: `${backendUrl}/appointments`,
  },
};
