import db from 'apps/magnetic/src/app/libs/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const boatType = searchParams.get('boatType');
  const capacityGreaterThan = searchParams.get('capacity_gt');
  const capacityLessThan = searchParams.get('capacity_lt');
  const crew = searchParams.get('crew');
  const priceGreaterThan = searchParams.get('price_gt');
  const priceLessThan = searchParams.get('price_lt');
  const sizeGreaterThan = searchParams.get('size_gt');
  const sizeLessThan = searchParams.get('size_lt');
  const startDate = searchParams.get('from');
  const endDate = searchParams.get('to');

  try {
    const filters: any[] = [];

    if (boatType)
      filters.push({ boatType: { equals: boatType, mode: 'insensitive' } });
    if (capacityGreaterThan)
      filters.push({ capacity: { gte: parseInt(capacityGreaterThan) } });
    if (capacityLessThan)
      filters.push({ capacity: { lte: parseInt(capacityLessThan) } });
    if (crew) filters.push({ crew: { gte: parseInt(crew) } });
    if (sizeGreaterThan)
      filters.push({ sizeInFeet: { gte: parseInt(sizeGreaterThan) } });
    if (sizeLessThan)
      filters.push({ sizeInFeet: { lte: parseInt(sizeLessThan) } });
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
          OR: [{ startDate: { lte: end }, endDate: { gte: start } }],
        },
        select: { boatId: true },
      });
      const unavailableBoatIds = unavailableBoats.map((b) => b.boatId);
      filters.push({ id: { notIn: unavailableBoatIds } });
    }

    const boats = await db.boatAttributes.findMany({
      where: { AND: filters.length > 0 ? filters : undefined },
    });

    const items = await db.item.findMany({
      where: {
        published: true,
        id: { in: boats.map((boat) => boat.itemId) },
      },
      select: {
        id: true,
        name: true,
        priceInCents: true,
        description: true,
        images: true,
        boatAttributes: {
          select: {
            id: true,
            capacity: true,
            sizeInFeet: true,
            lengthInMeters: true,
            crew: true,
            cabins: true,
            port: true,
            secondName: true,
          },
        },
        position: true,
        categoryId: true,
        serviceId: true,
        seasonPrices: {
          select: {
            startMonth: true,
            endMonth: true,
            priceInCents: true,
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
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
