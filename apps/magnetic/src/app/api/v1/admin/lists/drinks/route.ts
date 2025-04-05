import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
import slugify from 'slugify';
import { NewDrinksList } from '@magnetic/interfaces';

export async function POST(request: Request) {
  try {
    const data: NewDrinksList = await request.json();
    const slug = slugify(data.name, { lower: true });

    const list = await db.drinksList.create({
      data: {
        name: data.name,
        slug,
        description: '',
        items: {
          create: data.itemsIds.map((itemId) => ({
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

export async function GET() {
  try {
    const lists = await db.drinksList.findMany({});
    return NextResponse.json(lists);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
