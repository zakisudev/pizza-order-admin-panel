import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const PUT = async (
  req: NextRequest,
  { params }
) => {
  try {
    const client = await clientPromise;
    const db = client.db('pizza-order');
    const { id } = params;
    const { name, permissions } =
      await req.json();

    const existingRole = await db
      .collection('roles')
      .findOne({ _id: new ObjectId(id) });

    if (!existingRole) {
      return new NextResponse('Role not found', { status: 404 });
    }

    const result = await db
      .collection('roles')
      .updateOne({ _id: new ObjectId(id) }, { $set: { name, permissions } });

    if (result.modifiedCount === 0) {
      return new NextResponse('Error updating role', { status: 500 });
    }

    return NextResponse.json(
      { message: 'Role updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
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

    const existingRole = await db
      .collection('roles')
      .findOne({ _id: new ObjectId(id) });

    if (!existingRole) {
      return new NextResponse('Role not found', { status: 404 });
    }

    const result = await db
      .collection('roles')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new NextResponse('Error deleting role', { status: 500 });
    }

    return NextResponse.json(
      { message: 'Role deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
