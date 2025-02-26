import db from 'apps/magnetic/src/app/libs/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const boatType = searchParams.get('boatType');
  // const capacity = searchParams.get('capacity');
  const capacityGreaterThan = searchParams.get('capacity_gt');
  const capacityLessThan = searchParams.get('capacity_lt');
  const crew = searchParams.get('crew');
  const priceGreaterThan = searchParams.get('price_gt');
  const priceLessThan = searchParams.get('price_lt');
  const sizeGreaterThan = searchParams.get('size_gt');
  const sizeLessThan = searchParams.get('size_lt');
  // const beamGreaterThan = searchParams.get('beam_gt');
  // const beamLessThan = searchParams.get('beam_lt');
  // const lengthGreaterThan = searchParams.get('length_gt');
  // const lengthLessThan = searchParams.get('length_lt');
  // const cabins = searchParams.get('cabins');
  // const fuelConsumption = searchParams.get('fuel');
  // const port = searchParams.get('port');
  const startDate = searchParams.get('from');
  const endDate = searchParams.get('to');

  try {
    const filters: any[] = [];

    if (boatType)
      filters.push({ boatType: { equals: boatType, mode: 'insensitive' } });
    // if (capacity) filters.push({ capacity: { gte: parseInt(capacity) } });
    if (capacityGreaterThan)
      filters.push({ capacity: { gte: parseInt(capacityGreaterThan) } });
    if (capacityLessThan)
      filters.push({ capacity: { lte: parseInt(capacityLessThan) } });
    if (crew) filters.push({ crew: { gte: parseInt(crew) } });
    // if (cabins) filters.push({ cabins: { gte: parseInt(cabins) } });
    // if (fuelConsumption) filters.push({ fuelConsumption: { lte: parseInt(fuelConsumption) } });
    // if (port) filters.push({ port: { equals: port, mode: 'insensitive' } });

    // if (beamGreaterThan) filters.push({ beamInMeters: { gte: parseInt(beamGreaterThan) } });
    // if (beamLessThan) filters.push({ beamInMeters: { lte: parseInt(beamLessThan) } });
    if (sizeGreaterThan)
      filters.push({ sizeInFeet: { gte: parseInt(sizeGreaterThan) } });
    if (sizeLessThan)
      filters.push({ sizeInFeet: { lte: parseInt(sizeLessThan) } });
    // if (lengthGreaterThan)
    //   filters.push({ lengthInMeters: { gte: parseInt(lengthGreaterThan) } });
    // if (lengthLessThan)
    //   filters.push({ lengthInMeters: { lte: parseInt(lengthLessThan) } });

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
        boatAttributes: true,
        position: true,
        categoryId: true,
        serviceId: true,
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
