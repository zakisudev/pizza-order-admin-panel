import { NextResponse, NextRequest } from 'next/server';

export const POST = async (req:NextRequest) => {
  req.cookies.set('token', '', { maxAge: 0 });
  return NextResponse.json({message: 'Logout successful'}, { status: 200 });
}