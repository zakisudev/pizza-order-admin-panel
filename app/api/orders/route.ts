import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { orderStatuses } from '@/utils/constants';

export async function GET(request: Request) {
  try {
    const cookieHeader = request.cookies;

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
      return new NextResponse('Unauthorized', { status: 401 });
    }

    delete user.password;

    const orders = user?.isAuth
      ? await db.collection('orders').find({}).toArray()
      : await db
          .collection('orders')
          .find({ userId: new ObjectId(decoded?.userId) })
          .toArray();

    if (!orders || !orders.length) {
      return new NextResponse('No Orders found', { status: 404 });
    }

    if (user?.isAuth) {
      const sortedOrders = orders?.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      return NextResponse.json(
        {
          orders: sortedOrders?.map((order) => {
            return {
              ...order,
              _id: order._id,
              name: order.pizza.name,
              quantity: order.quantity,
              toppings: order.toppings,
              type: order.type,
              status: order.status,
              imageUrl: order.pizza.imageUrl,
              phoneNumber: user.phoneNumber,
              createdAt: order.createdAt,
            };
          }),
        },
        { status: 200 }
      );
    }

    const sortedOrders = orders?.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return NextResponse.json({ orders: sortedOrders }, { status: 200 });
  } catch (e) {
    console.error(e);
    return new NextResponse('Error fetching data', { status: 500 });
  }
}

export const POST = async (request: Request) => {
  try {
    const cookieHeader = request.cookies;

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
      return new NextResponse('Ordering User not found', { status: 404 });
    }

    const { order } = await request.json();

    const newOrder = {
      pizza: order.pizza,
      quantity: order.quantity,
      toppings: order.toppings,
      type: order.type,
      userId: user?._id,
      status: orderStatuses.preparing,
      createdAt: new Date(),
    };

    const result = await db.collection('orders').insertOne(newOrder);

    if (!result) {
      return new NextResponse('Error creating order', { status: 500 });
    }

    return NextResponse.json({message: 'Order created successfully'}, { status: 201 });
  } catch (e) {
    console.error(e);
    return new NextResponse('Error creating order', { status: 500 });
  }
};
