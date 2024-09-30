import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';
import generateToken from '@/utils/generateToken';

export const POST = async (req: NextRequest) => {
  try {
    const client = await clientPromise;
    const db = client.db('pizza-order');
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return new NextResponse('Invalid email or password', { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new NextResponse('Invalid email or password', { status: 401 });
    }

    const token = await generateToken(user);

    // user without password
    delete user.password;

    const response = NextResponse.json({ user, message: 'Login successful' });

    // Set the token in a cookie
    response.headers.set(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; Max-Age=86400`
    );

    return response;
  } catch (error) {
    console.error(error);
    return new NextResponse('Error logging in', { status: 500 });
  }
};
