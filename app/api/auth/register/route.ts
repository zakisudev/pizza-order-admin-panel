import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { hashPassword } from '@/utils/hashPassword';
import { resourceStatuses } from '@/utils/constants';

export const POST = async (req: NextRequest) => {
  try {
    const { fullName, email, password, location, phoneNumber } =
      await req.json();

    if (!email || !password || !location || !phoneNumber) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    const newUser = {
      fullName,
      email,
      password: await hashPassword(password),
      location,
      phoneNumber,
      status: resourceStatuses.active,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db('pizza-order');

    const existingUserWithEmail = await db.collection('users').findOne({ email: newUser.email });

    if (existingUserWithEmail) {
      return new NextResponse('Email already exists, Please Login', {
        status: 400,
      });
    }

    const existingUserWithPhoneNumber = await db.collection('users').findOne({ phoneNumber: newUser.phoneNumber });

    if (existingUserWithPhoneNumber) {
      return new NextResponse('Phone number already in use', {
        status: 400,
      });
    }

    const res = await db.collection('users').insertOne(newUser);

    if (!res) {
      return new NextResponse('An error occurred', { status: 500 });
    }

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(e);
    return new NextResponse('Error fetching data', { status: 500 });
  }
};
