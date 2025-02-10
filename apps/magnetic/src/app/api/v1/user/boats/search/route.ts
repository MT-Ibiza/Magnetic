import db from 'apps/magnetic/src/app/libs/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const boatType = searchParams.get('boatType');
  const capacity = searchParams.get('capacity');
  const crew = searchParams.get('crew');
  const priceGreaterThan = searchParams.get('price_gt');
  const priceLessThan = searchParams.get('price_lt');
  const startDate = searchParams.get('from');
  const endDate = searchParams.get('to');

  try {
    const filters: any[] = [];

    if (boatType) {
      filters.push({ boatType: { equals: boatType, mode: 'insensitive' } });
    }
    if (capacity) {
      filters.push({ capacity: { gte: parseInt(capacity) } });
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

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const unavailableBoats = await db.boatAvailability.findMany({
        where: {
          OR: [
            {
              startDate: { lte: end },
              endDate: { gte: start },
            },
          ],
        },
        select: {
          boatId: true,
        },
      });

      const unavailableBoatIds = unavailableBoats.map((b) => b.boatId);

      filters.push({
        id: {
          notIn: unavailableBoatIds,
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
        published: true,
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
    console.error(error);
    return NextResponse.json(
      {
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
