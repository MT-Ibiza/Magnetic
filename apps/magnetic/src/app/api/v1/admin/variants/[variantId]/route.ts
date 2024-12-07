import { NextResponse } from 'next/server';
import { EditItem, EditItemVariant } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string; itemId: string; variantId: string } }
) {
  try {
    const variant = await db.itemVariant.findUnique({
      where: {
        id: Number(params.variantId),
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string; itemId: string; variantId: string } }
) {
  const data: EditItemVariant = await request.json();
  const { name, priceInCents, description } = data;
  try {
    const service = await db.itemVariant.update({
      where: {
        id: Number(params.variantId),
        itemId: Number(params.itemId),
      },
      data: {
        name,
        priceInCents,
        description,
      },
    });
    return NextResponse.json(service, { status: 201 });
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
