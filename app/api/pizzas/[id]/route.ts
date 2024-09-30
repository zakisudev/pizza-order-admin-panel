import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('pizza-order');

    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return new NextResponse('Invalid ID format', { status: 400 });
    }

    const pizza = await db
      .collection('pizzas')
      .findOne({ _id: new ObjectId(id) });

    if (!pizza) {
      return new NextResponse('Pizza not found', { status: 404 });
    }

    return NextResponse.json(pizza, {status : 200});
  } catch (e) {
    console.error(e);
    return new NextResponse('Error fetching data', { status: 500 });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const client = await clientPromise;
    const db = client.db('pizza-order');
    const { id } = params;
    const { toppings } = await req.json();

    if (!ObjectId.isValid(id)) {
      return new NextResponse('Invalid ID format', { status: 400 });
    }

    const pizza = await db
      .collection('pizzas')
      .findOne({ _id: new ObjectId(id) });

    if (!pizza) {
      return new NextResponse('Pizza not found', { status: 404 });
    }

    const result = await db
      .collection('pizzas')
      .updateOne({ _id: new ObjectId(id) }, { $set: { toppings: toppings } });

    return NextResponse.json(result, { message: 'Pizza updated successfully' });
  } catch (error) {
    console.error(e);
    return new NextResponse('Error fetching data', { status: 500 });
  }
};
