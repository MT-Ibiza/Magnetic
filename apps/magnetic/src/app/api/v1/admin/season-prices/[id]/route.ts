import { NextResponse } from 'next/server';
import { EditSeasonPrice } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const price = await db.seasonPrice.findUnique({
      where: {
        id: Number(params.id),
      },
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data: EditSeasonPrice = await request.json();
  try {
    const price = await db.seasonPrice.update({
      where: {
        id: Number(params.id),
      },
      data,
    });
    return NextResponse.json(price, { status: 201 });
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
  { params }: { params: { id: string } }
) {
  try {
    await db.seasonPrice.delete({
      where: {
        id: Number(params.id),
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
