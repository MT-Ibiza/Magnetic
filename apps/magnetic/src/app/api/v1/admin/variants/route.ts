import { NewItemVariant } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data: NewItemVariant = await request.json();
  const { name, description, priceInCents, itemId, capacity } = data;
  try {
    const variant = await db.itemVariant.create({
      data: {
        name,
        description,
        priceInCents,
        capacity,
        itemId: Number(itemId),
      },
    });
    return NextResponse.json(variant);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  const { itemId } = await request.json();
  try {
    const variants = await db.itemVariant.findMany({
      where: {
        itemId: Number(itemId),
      },
    });
    return NextResponse.json(variants);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
