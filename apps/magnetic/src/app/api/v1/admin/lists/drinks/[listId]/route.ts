import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { listId: string } }
) {
  try {
    const list = await db.drinksList.findUnique({
      where: {
        id: Number(params.listId),
      },
      include: {
        items: {
          select: {
            itemId: true,
          },
        },
      },
    });

    if (!list) {
      return NextResponse.json({ message: 'List Not Found' }, { status: 404 });
    }

    return NextResponse.json(list);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
