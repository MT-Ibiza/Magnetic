import db from 'apps/magnetic/src/app/libs/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const categoriesIds = searchParams.get('categoriesIds');
  const name = searchParams.get('name');

  try {
    const filters: any = {
      published: true,
    };

    if (categoriesIds) {
      const categoryArray = categoriesIds
        .split(',')
        .map((id) => parseInt(id.trim()));
      filters.categoryId = { in: categoryArray };
    }

    if (name) {
      filters.name = { contains: name, mode: 'insensitive' };
    }

    const drinkService = await db.service.findMany({
      where: {
        serviceType: 'drinks',
      },
      select: {
        id: true,
      },
    });

    if (drinkService.length) {
      const items = await db.item.findMany({
        where: {
          ...filters,
          ...{ serviceId: drinkService[0].id, published: true },
        },
        select: {
          id: true,
          name: true,
          priceInCents: true,
          description: true,
          images: true,
          drinkAttributes: {
            select: {
              id: true,
              size: true,
              units: true,
            },
          },
          position: true,
          categoryId: true,
          serviceId: true,
          category: {
            select: {
              formType: true,
              id: true,
              name: true,
              position: true,
              serviceId: true,
            },
          },
          service: {
            select: {
              id: true,
              name: true,
              serviceType: true,
            },
          },
        },
      });
      return NextResponse.json(items);
    } else {
      return NextResponse.json([]);
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
