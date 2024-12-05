import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // retrieve the current response
  const res = NextResponse.next();
  const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

  // add the CORS headers to the response
  if (req.nextUrl.pathname.startsWith('/api')) {
    res.headers.append('Access-Control-Allow-Credentials', 'true');
    res.headers.append(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    res.headers.append('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.headers.append(
      'Access-Control-Allow-Methods',
      'GET,DELETE,PATCH,POST,PUT'
    );
    res.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    return res;
  }

  return NextResponse.next();
}
