import { Item } from '@magnetic/interfaces';
import { getNumberMonth } from '@magnetic/utils';
import db from 'apps/magnetic/src/app/libs/db';
import moment from 'moment';
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

    if (startDate) {
      const startUTC = moment.utc(startDate).startOf('day');
      const nextDayUTC = moment.utc(startDate).add(1, 'day').startOf('day');

      const unavailableBoats = await db.boatAvailability.findMany({
        where: {
          AND: [
            { endDate: { gte: startUTC.toDate() } },
            { endDate: { lt: nextDayUTC.toDate() } },
          ],
        },
        select: { boatId: true, text: true, startDate: true },
      });
      const unavailableBoatIds = unavailableBoats.map((b) => b.boatId);
      // console.log('unavailableBoatIds: ', unavailableBoats);
      filters.push({ id: { notIn: unavailableBoatIds } });
    }

    const boats = await db.boatAttributes.findMany({
      where: { AND: filters.length > 0 ? filters : undefined },
    });

    let items = await db.item.findMany({
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
            priceInCents: true,
            startMonth: true,
            endMonth: true,
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

    const monthSelected = startDate ? getNumberMonth(startDate) : undefined;

    if (monthSelected) {
      items = items.map((item) => {
        const seasonPrice = item.seasonPrices.find(
          (seasonPrice) => seasonPrice.startMonth === monthSelected
        );
        return {
          ...item,
          prices: seasonPrice
            ? [seasonPrice.priceInCents]
            : [item.priceInCents],
        } as any;
      });
    } else {
      items = items.map((item) => {
        const prices = item.seasonPrices.map((sp) => sp.priceInCents);
        return {
          ...item,
          prices: prices.concat(item.priceInCents),
        } as any;
      });
    }

    if (priceGreaterThan || priceLessThan) {
      const priceInCentsGreaterThan = priceGreaterThan
        ? Number(priceGreaterThan) * 100
        : undefined;
      const priceInCentsLessThan = priceLessThan
        ? Number(priceLessThan) * 100
        : undefined;
      items = filterItemsByPriceRange(
        //@ts-ignore
        items,
        priceInCentsGreaterThan,
        priceInCentsLessThan
      ) as any[];
    }

    return NextResponse.json(items);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

function filterItemsByPriceRange(
  items: { prices: number[]; name: string }[],
  minPrice?: number,
  maxPrice?: number
) {
  return items.filter(({ prices, name }) => {
    console.log(`${name}:  prices: [${prices}]`);
    return prices.some(
      (price) =>
        (minPrice === undefined || price >= minPrice) &&
        (maxPrice === undefined || price <= maxPrice)
    );
  });
}
