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
  },
  SALES: {
    GET: `${backendUrl}/sales`,
  },
  CLIENTS: {
    GET: `${backendUrl}/clients`,
  },
};
