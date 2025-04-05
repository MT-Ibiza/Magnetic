import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
import { ParamsPublicList } from '@magnetic/interfaces';
import slugify from 'slugify';

export async function POST(request: Request) {
  try {
    const { name, itemsIds, type }: ParamsPublicList = await request.json();
    const slug = slugify(name, { lower: true });

    const list = await db.publicList.create({
      data: {
        name,
        slug,
        type: type as 'drinks',
        items: {
          create: itemsIds.map((itemId) => ({
            item: {
              connect: { id: itemId },
            },
          })),
        },
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    return NextResponse.json(list);
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
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    const lists = await db.publicList.findMany({
      where: {
        type: type as 'drinks',
      },
    });
    return NextResponse.json(lists);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
