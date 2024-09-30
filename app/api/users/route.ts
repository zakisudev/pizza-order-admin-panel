import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { hashPassword } from '@/utils/hashPassword';
import { resourceStatuses } from '@/utils/constants';

export const GET = async (req: NextRequest) => {
  try {
    const cookieHeader = req.cookies;

    const token = cookieHeader.get('token') || { value: null };

    if (!token?.value) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const decoded = (await jwt.verify(
      token?.value,
      process.env.JWT_SECRET || ''
    )) || { userId: null };

    const client = await clientPromise;
    const db = client.db('pizza-order');

    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId((decoded as JwtPayload)?.userId) });

    if (!user || !user.isAuth) {
      return new NextResponse('Unauthorized access', { status: 401 });
    }

    const users = await db.collection('users').find({}).toArray();

    if (!users || !users.length) {
      return new NextResponse('No users found', { status: 404 });
    }

    return NextResponse.json(
      {
        users: users.map((user: any) => {
          return {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            location: user.location,
            phoneNumber: user.phoneNumber,
            role: user.role,
            status: user.status,
            createdAt: new Date(),
          };
        }),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal server error', { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { fullName, email, password, location, phoneNumber, role } =
      await req.json();

    if (
      !email ||
      !password ||
      !location ||
      !phoneNumber ||
      !role ||
      !fullName
    ) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('pizza-order');

    const existingRole = await db
      .collection('roles')
      .findOne({ _id: new ObjectId(role) });

    if (!existingRole) {
      return new NextResponse("Role doesn't exists", {
        status: 400,
      });
    }

    const newUser = {
      fullName,
      email,
      location,
      phoneNumber,
      role: existingRole.name,
      password: await hashPassword(password),
      status: resourceStatuses.active,
      createdAt: new Date(),
    };

    const existingUser = await db
      .collection('users')
      .findOne({ email: newUser.email });

    if (existingUser) {
      return new NextResponse('Email already exists, Please Login', {
        status: 400,
      });
    }

    const res = await db.collection('users').insertOne(newUser);

    if (!res) {
      return new NextResponse('An error occurred', { status: 500 });
    }

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal server error', { status: 500 });
  }
};
