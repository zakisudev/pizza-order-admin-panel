import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { resourceStatuses } from '@/utils/constants'

export const GET = async (req: NextRequest) => {
  try {
    const cookieHeader = req.cookies;

    const token = cookieHeader.get('token');

    if (!token.value) {
      return new NextResponse('Unauthorized, invalid token', { status: 401 });
    }

    const decoded = await jwt.verify(token.value, process.env.JWT_SECRET);

    const client = await clientPromise;
    const db = client.db('pizza-order');

    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(decoded?.userId) });

    if (!user || !user.isAuth) {
      return new NextResponse('Unauthorized access', { status: 401 });
    }

    const roles = await db.collection('roles').find({}).toArray();

    if (!roles || !roles.length) {
      return new NextResponse('No roles found', { status: 404 });
    }

    return NextResponse.json({ roles }, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal server error', { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { name, permissions } = await req.json();

    if ( !name || !permissions || !permissions.length) {
      return new NextResponse('Missing fields', { status: 400 });
    }

    const newRole = {
      name,
      permissions,
      status: resourceStatuses.active,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db('pizza-order');

    const existingRole = await db
      .collection('roles')
      .findOne({ name: newRole.name });

    if (existingRole) {
      return new NextResponse('Role already exists', {
        status: 400,
      });
    }

    const res = await db.collection('roles').insertOne(newRole);

    if (!res) {
      return new NextResponse('An error occurred', { status: 500 });
    }

    return NextResponse.json({ message: 'Role registered successfully' }, {status: 201});
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal server error', { status: 500 });
  }
};
