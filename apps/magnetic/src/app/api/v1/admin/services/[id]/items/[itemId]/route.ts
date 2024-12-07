import { NextResponse } from 'next/server';
import { EditItem } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string; itemId: string } }
) {
  try {
    const item = await db.item.findUnique({
      where: {
        id: Number(params.itemId),
        serviceId: Number(params.id),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        service: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const categories = await db.category.findMany({
      where: {
        items: {
          some: {
            service: {
              name: item?.category?.name,
            },
          },
        },
      },
    });
    console.log(categories);
    const data = {
      item,
      categories,
    };
    return NextResponse.json(data);
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
  { params }: { params: { id: string; itemId: string } }
) {
  const data: EditItem = await request.json();
  const { name, priceInCents, description } = data;
  try {
    const service = await db.item.update({
      where: {
        id: Number(params.itemId),
        serviceId: Number(params.id),
      },
      data,
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
