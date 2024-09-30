import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Get the token from the authorization header
  const token = req.cookies?.get('token');

  // If no token is found, redirect to login or return an unauthorized response
  if (!token) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  // If the token exists, allow the request to continue
  return NextResponse.next();
}

// Protect the /api/orders route
export const config = {
  matcher: ['/api/orders'],
};
