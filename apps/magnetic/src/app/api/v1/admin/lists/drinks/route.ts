import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const drinksService = await db.service.findFirst({
      where: {
        serviceType: 'drinks',
      },
      include: {
        categories: {
          select: {
            id: true,
            name: true,
            position: true,
          },
        },
        items: {
          where: {
            published: true,
          },
          select: {
            id: true,
            name: true,
            position: true,
            images: true,
            category: {
              select: {
                id: true,
                name: true,
                position: true,
              },
            },
          },
        },
      },
    });

    if (!drinksService) {
      return NextResponse.json(
        { message: 'Not Found Drinks Service' },
        { status: 404 }
      );
    }

    return NextResponse.json(drinksService.items);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
