import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  try {
    const service = await db.service.findFirst({
      where: {
        serviceType: type as 'boat_rental',
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
            boatAttributes: true,
            drinkAttributes: true,
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

    if (!service) {
      return NextResponse.json(
        { message: 'Not Found Drinks Service' },
        { status: 404 }
      );
    }

    return NextResponse.json(service.items);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
