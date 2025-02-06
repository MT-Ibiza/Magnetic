import db from 'apps/magnetic/src/app/libs/db';
import { AirtableBoat } from '@magnetic/interfaces';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data: AirtableBoat = await request.json();
  const {
    capacity,
    id,
    lengthInMeters,
    beamInMeters,
    boat,
    iCal,
    fuelConsumption,
    name,
    port,
    price,
    included,
    cabins,
    crew,
    type,
  } = data;
  try {
    const service = await db.service.findMany({
      where: {
        serviceType: 'boat_rental' as 'boat_rental',
      },
    });
    const serviceId = service[0].id;
    const newBoat = await db.item.create({
      data: {
        name: boat,
        priceInCents: 1000,
        serviceId: serviceId,
        description: included,
        boatAttributes: {
          create: {
            crew,
            cabins,
            port,
            capacity,
            iCal,
            beamInMeters,
            fuelConsumption,
            boatType: type,
            secondName: name,
            airtableId: id,
            sizeInMeters: lengthInMeters,
          },
        },
      },
    });
    return NextResponse.json(newBoat);
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

export async function PUT(request: NextRequest) {
  const data: AirtableBoat = await request.json();
  const {
    capacity,
    id,
    lengthInMeters,
    beamInMeters,
    boat,
    iCal,
    fuelConsumption,
    name,
    port,
    price,
    included,
    cabins,
    crew,
    type,
  } = data;
  try {
    const boatFound = await db.boatAttributes.findUnique({
      where: {
        airtableId: id,
      },
      include: {
        item: true,
      },
    });

    if (!boatFound) {
      return NextResponse.json(
        {
          message: `No boat find with airtableId: ${id}`,
        },
        {
          status: 404,
        }
      );
    }

    const updatedBoat = await db.item.update({
      where: {
        id: boatFound.item.id,
      },
      data: {
        name: boat,
        description: included,
        boatAttributes: {
          update: {
            crew,
            cabins,
            port,
            capacity,
            iCal,
            beamInMeters,
            fuelConsumption,
            boatType: type,
            secondName: name,
            airtableId: id,
            sizeInMeters: lengthInMeters,
            description: included,
          },
        },
      },
    });

    return NextResponse.json(updatedBoat);
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
