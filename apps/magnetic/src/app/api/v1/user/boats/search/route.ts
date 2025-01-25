import db from 'apps/magnetic/src/app/libs/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const boatType = searchParams.get('boatType');
  const guests = searchParams.get('guests');
  const crew = searchParams.get('crew');
  const priceGreaterThan = searchParams.get('price_gt');
  const priceLessThan = searchParams.get('price_lt');
  try {
    const filters: any[] = [];
    if (boatType) {
      filters.push({ boatType: { equals: boatType, mode: 'insensitive' } });
    }
    if (guests) {
      filters.push({ guests: { gte: parseInt(guests) } });
    }
    if (crew) {
      filters.push({ crew: { gte: parseInt(crew) } });
    }
    if (priceGreaterThan || priceLessThan) {
      filters.push({
        item: {
          priceInCents: {
            ...(priceGreaterThan
              ? { gte: parseInt(priceGreaterThan) * 100 }
              : {}),
            ...(priceLessThan ? { lte: parseInt(priceLessThan) * 100 } : {}),
          },
        },
      });
    }

    const boats = await db.boatAttributes.findMany({
      where: {
        AND: filters.length > 0 ? filters : undefined,
      },
    });

    const items = await db.item.findMany({
      where: {
        id: {
          in: boats.map((boat) => boat.itemId),
        },
      },
      include: {
        boatAttributes: true,
      },
    });

    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
