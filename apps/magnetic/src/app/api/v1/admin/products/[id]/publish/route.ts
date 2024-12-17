import db from 'apps/magnetic/src/app/libs/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { published }: { published: boolean } = await request.json();

  try {
    const product = await db.item.update({
      where: { id: Number(params.id) },
      data: {
        published,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    console.error('Error updating product:', error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
