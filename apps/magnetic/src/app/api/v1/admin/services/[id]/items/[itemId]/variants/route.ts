import { NewItemVariant } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string; itemId: string } }
) {
  const data: NewItemVariant = await request.json();
  const { name, description, priceInCents } = data;
  try {
    const variant = await db.itemVariant.create({
      data: {
        name,
        description,
        priceInCents,
        itemId: Number(params.itemId),
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

export async function GET(
  request: Request,
  { params }: { params: { id: string; itemId: string } }
) {
  try {
    const variants = await db.itemVariant.findMany({
      where: {
        itemId: Number(params.itemId),
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
