import { NewSeasonPrice } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data: NewSeasonPrice = await request.json();
  try {
    const price = await db.seasonPrice.create({
      data,
    });
    return NextResponse.json(price);
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
    const prices = await db.seasonPrice.findMany({
      where: {
        itemId: Number(itemId),
      },
    });
    return NextResponse.json(prices);
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
