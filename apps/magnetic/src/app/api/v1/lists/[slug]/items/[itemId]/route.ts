import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';

export async function GET(
  request: Request,
  { params }: { params: { slug: string; itemId: string } }
) {
  try {
    const list = await db.publicList.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!list) {
      return NextResponse.json(
        {
          message: 'List not exist',
        },
        {
          status: 404,
        }
      );
    }

    const publicListItem = await db.publicListItem.findFirst({
      where: {
        itemId: Number(params.itemId),
        publicListId: list.id,
      },
      select: {
        item: {
          select: {
            id: true,
            name: true,
            description: true,
            priceInCents: true,
            serviceId: true,
            images: {
              select: {
                id: true,
                position: true,
                url: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
                formType: true,
                serviceId: true,
                position: true,
              },
            },
            service: {
              select: {
                id: true,
                name: true,
                serviceType: true,
                instructions: true,
                termsAndConditions: true,
              },
            },
            boatAttributes: true,
            variants: {
              select: {
                id: true,
                name: true,
                priceInCents: true,
                description: true,
                capacity: true,
                hours: true,
              },
              orderBy: {
                createdAt: 'asc',
              },
            },
            seasonPrices: {
              select: {
                id: true,
                startMonth: true,
                endMonth: true,
                priceInCents: true,
              },
            },
          },
        },
      },
    });

    if (!publicListItem) {
      return NextResponse.json(
        {
          message: 'Item not found',
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(publicListItem.item);
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
