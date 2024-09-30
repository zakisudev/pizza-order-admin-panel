import { orderStatuses } from '@/utils/constants';
import jwt from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const cookieHeader = req.cookies;

    const token = cookieHeader.get('token');

    if (!token.value) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const decoded = await jwt.verify(token.value, process.env.JWT_SECRET);

    const client = await clientPromise;
    const db = client.db('pizza-order');

    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(decoded?.userId) });

    if (!user) {
      return new NextResponse('No User found', { status: 404 });
    }

    const { status } = await req.json();

    if (!Object.values(orderStatuses).includes(status)) {
      return new NextResponse('Invalid order status', { status: 400 });
    }

    const order = await db
      .collection('orders')
      .findOne({ _id: new ObjectId(params.id) });

    if (!order) {
      return new NextResponse('Order not found', { status: 404 });
    }

    const result = await db
      .collection('orders')
      .updateOne({ _id: new ObjectId(params.id) }, { $set: { status: status } });

    if (!result) {
      return new NextResponse('Error updating order status', { status: 500 });
    }

    return NextResponse.json('Order status updated', { status: 200 });
  } catch (e) {
    console.error(e);
    return new NextResponse('Error updating order', { status: 500 });
  }
}