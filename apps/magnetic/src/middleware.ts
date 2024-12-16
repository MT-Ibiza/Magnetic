import { NextResponse } from 'next/server';

export function middleware(req: Request) {
  // Verificar si la solicitud es preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    const res = new NextResponse(null, { status: 200 }); // Respuesta vacía con estado 200
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    res.headers.set('Access-Control-Allow-Origin', '*'); // Ajusta esto según tu origen
    res.headers.set(
      'Access-Control-Allow-Methods',
      'GET, DELETE, PATCH, POST, PUT, OPTIONS'
    );
    res.headers.set(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    return res;
  }

  // Para otras solicitudes
  const res = NextResponse.next();
  res.headers.set('Access-Control-Allow-Credentials', 'true');
  res.headers.set('Access-Control-Allow-Origin', '*'); // Ajusta esto según tu origen
  res.headers.set(
    'Access-Control-Allow-Methods',
    'GET, DELETE, PATCH, POST, PUT, OPTIONS'
  );
  res.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  return res;
}

// Configuración para aplicar el middleware
export const config = {
  matcher: '/api/:path*',
};
