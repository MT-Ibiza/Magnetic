import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const list = await db.publicList.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        items: {
          select: {
            itemId: true,
            item: {
              include: {
                boatAttributes: true,
                drinkAttributes: true,
                images: true,
                seasonPrices: true,
              },
            },
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
