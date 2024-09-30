import { NextResponse, NextRequest } from 'next/server';

export const POST = async (req:NextRequest) => {
  const response = NextResponse.json(
    { message: 'Logout successful' },
    { status: 200 }
  );
  response.cookies.set('token', '', { maxAge: 0 });
  return response;
}