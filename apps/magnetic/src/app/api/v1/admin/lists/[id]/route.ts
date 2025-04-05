import { ParamsPublicList } from '@magnetic/interfaces';
import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';
import slugify from 'slugify';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const list = await db.publicList.findUnique({
      where: {
        id: Number(params.id),
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
  { params }: { params: { id: string } }
) {
  const data: ParamsPublicList = await request.json();
  const listId = Number(params.id);

  try {
    const existingItems = await db.publicListItem.findMany({
      where: {
        publicListId: listId,
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
      db.publicList.update({
        where: { id: listId },
        data: {
          name: data.name,
          slug: slugify(data.name, { lower: true }),
        },
      }),

      db.publicListItem.deleteMany({
        where: {
          publicListId: listId,
          itemId: { in: itemsToDelete },
        },
      }),

      ...itemsToAdd.map((itemId) =>
        db.publicListItem.create({
          data: {
            publicListId: listId,
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.publicList.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(
      { message: 'List deleted successfully' },
      { status: 200 }
    );
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
