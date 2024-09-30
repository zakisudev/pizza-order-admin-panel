import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const GET = async () => {
  try {
    const client = await clientPromise;
    const db = client.db('pizza-order');

    const pizzas = await db.collection('pizzas').find({}).toArray();

    if (!pizzas) {
      return NextResponse.json({ error: 'No Pizzas Found' }, { status: 404 });
    }

    return NextResponse.json(pizzas);
  } catch (e) {
    console.error(e);
    return new NextResponse('Error fetching data', { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { name, price, description, toppings, image, types } = await req.json();

    if (!name || !price || !image) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const newPizza = {
      name,
      price,
      description,
      toppings,
      imageUrl: image,
      types,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db('pizza-order');

    const result = await db.collection('pizzas').insertOne(newPizza);

    if (!result) {
      return new NextResponse('An error occurred', { status: 500 });
    }

    return NextResponse.json({ message: 'Pizza added successfully' }, {status: 201});
  } catch (error:any) {
    console.error(error);
    return new NextResponse('Error fetching data', { status: 500 });
  }
};
