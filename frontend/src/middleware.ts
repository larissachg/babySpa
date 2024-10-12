import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.AUTH_SECRET });
  const url = req.nextUrl.clone();

  if (session === null || session === undefined) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

// Usar esta opcion para que solo se protejan algunas paginas
// export const config = {
// matcher: ['/calendar/:path*', '/products/:path*', '/clients/:path*', '/sales/:path*', '/users/:path*',],
// };

// Usar esta opcion para que este todo protegido excepto login o la pagina que vos querras, le pones |tupagina 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};