import { NextResponse } from 'next/server';
import { EditItemVariant } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';

export async function GET(
  request: Request,
  { params }: { params: { variantId: string } }
) {
  try {
    const variant = await db.itemVariant.findUnique({
      where: {
        id: Number(params.variantId),
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
  { params }: { params: { variantId: string } }
) {
  const data: EditItemVariant = await request.json();
  const { name, priceInCents, description, itemId } = data;
  try {
    const service = await db.itemVariant.update({
      where: {
        id: Number(params.variantId),
        itemId: Number(itemId),
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

export async function DELETE(
  request: Request,
  { params }: { params: { variantId: string } }
) {
  try {
    await db.itemVariant.delete({
      where: {
        id: Number(params.variantId),
      },
    });
    return NextResponse.json('ok');
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
