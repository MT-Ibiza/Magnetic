import { NewDrinksList } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
import slugify from 'slugify';

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

export async function PUT(
  request: Request,
  { params }: { params: { listId: string } }
) {
  const data: NewDrinksList = await request.json();
  const listId = Number(params.listId);

  try {
    const existingItems = await db.drinksListItem.findMany({
      where: {
        drinkItemListId: listId,
      },
      select: {
        itemId: true,
      },
    });

    const existingItemIds = existingItems.map((item) => item.itemId);

    const itemsToDelete = existingItemIds.filter(
      (id) => !data.itemsIds.includes(id)
    );

    const itemsToAdd = data.itemsIds.filter(
      (id) => !existingItemIds.includes(id)
    );

    const updated = await db.$transaction([
      db.drinksList.update({
        where: { id: listId },
        data: {
          name: data.name,
          slug: slugify(data.name, { lower: true }),
        },
      }),

      db.drinksListItem.deleteMany({
        where: {
          drinkItemListId: listId,
          itemId: { in: itemsToDelete },
        },
      }),

      ...itemsToAdd.map((itemId) =>
        db.drinksListItem.create({
          data: {
            drinkItemListId: listId,
            itemId,
          },
        })
      ),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating drinks list:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
