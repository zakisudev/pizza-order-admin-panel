import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const PUT = async (req: NextRequest, { params }: any) => {
  try {
    const client = await clientPromise;
    const db = client.db('pizza-order');
    const { id } = params;
    const { fullName, email, password, location, phoneNumber, role } =
      await req.json();

    const existingUser = await db
      .collection('users')
      .findOne({ _id: new ObjectId(id) });

    if (!existingUser) {
      return new NextResponse('User not found', { status: 404 });
    }

    const result = await db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { fullName, email, password, location, phoneNumber, role } }
      );

    if (result.modifiedCount === 0) {
      return new NextResponse('Error updating user', { status: 500 });
    }

    return NextResponse.json(
      { message: 'User updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal server error', { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const client = await clientPromise;
    const db = client.db('pizza-order');
    const { id } = params;

    const existingUser = await db
      .collection('users')
      .findOne({ _id: new ObjectId(id) });

    if (!existingUser) {
      return new NextResponse('User not found', { status: 404 });
    }

    const result = await db
      .collection('users')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new NextResponse('Error deleting user', { status: 500 });
    }

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal server error', { status: 500 });
  }
};
