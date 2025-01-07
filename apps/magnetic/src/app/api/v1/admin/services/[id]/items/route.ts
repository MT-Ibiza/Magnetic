import { NewItem } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: number } }
) {
  const data: NewItem = await request.json();
  const { name, description, priceInCents, boatAttributes } = data;
  try {
    if (boatAttributes) {
      const item = await db.item.create({
        data: {
          name,
          description,
          priceInCents,
          serviceId: Number(params.id),
          boatAttributes: {
            create: {
              boatType: boatAttributes.boatType,
              berth: boatAttributes.berth,
              guests: boatAttributes.guests,
              crew: boatAttributes.crew,
              beamInCentimeters: boatAttributes.beamInCentimeters,
              cabins: boatAttributes.cabins,
              fuelConsumption: boatAttributes.fuelConsumption,
              description: boatAttributes.description,
              latitude: boatAttributes.latitude,
              longitude: boatAttributes.longitude,
              boatSizeInCentimeters: boatAttributes.boatSizeInCentimeters,
            },
          },
        },
      });
      return NextResponse.json(item);
    } else {
      const item = await db.item.create({
        data: {
          name,
          description,
          priceInCents,
          serviceId: Number(params.id),
        },
      });
      return NextResponse.json(item);
    }
  } catch (error: any) {
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

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const items = await db.item.findMany({
      where: {
        serviceId: Number(params.id),
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(items);
  } catch (error: any) {
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
