import { NextResponse } from 'next/server';
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
        images: true,
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
            serviceType: true,
            instructions: true,
            termsAndConditions: true
          },
        },
        boatAttributes: true,
        variants: {
          select: {
            id: true,
            name: true,
            priceInCents: true,
            description: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    const categories = await db.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
      // where: {
      //   items: {
      //     some: {
      //       service: {
      //         name: item?.category?.name,
      //       },
      //     },
      //   },
      // },
    });
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


