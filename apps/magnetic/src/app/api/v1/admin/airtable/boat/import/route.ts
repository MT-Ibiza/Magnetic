import db from 'apps/magnetic/src/app/libs/db';
import { AirtableBoat } from '@magnetic/interfaces';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data: AirtableBoat = await request.json();
  const { capacity, id, length, name, port, price } = data;
  try {
    const service = await db.service.findMany({
      where: {
        serviceType: 'boat_rental' as 'boat_rental',
      },
    });
    const serviceId = service[0].id;
    const boat = await db.item.create({
      data: {
        name,
        priceInCents: 1000,
        serviceId: serviceId,
        description: 'boat imported',
        boatAttributes: {
          create: {
            airtableId: id,
            guests: capacity,
            crew: capacity,
            beamInCentimeters: length,
            cabins: capacity,
            fuelConsumption: capacity,
            boatType: 'any',
            berth: port,
          },
        },
      },
    });
    return NextResponse.json(boat);
  } catch (error) {
    if (error instanceof Error) {
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
}
