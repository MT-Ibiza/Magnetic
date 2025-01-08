import { NextResponse } from 'next/server';
import { EditItem } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string; itemId: string } }
) {
  try {
    const item = await db.item.findUnique({
      where: {
        id: Number(params.itemId),
        serviceId: Number(params.id),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        service: {
          select: {
            id: true,
            name: true,
            serviceType: true,
          },
        },
        boatAttributes: true,
        variants: {
          select: {
            id: true,
            name: true,
            priceInCents: true,
            description: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    const categories = await db.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
      // where: {
      //   items: {
      //     some: {
      //       service: {
      //         name: item?.category?.name,
      //       },
      //     },
      //   },
      // },
    });
    const data = {
      item,
      categories,
    };
    return NextResponse.json(data);
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string; itemId: string } }
) {
  const data: EditItem = await request.json();
  const { name, priceInCents, description, categoryId, boatAttributes } = data;
  try {
    if (boatAttributes) {
      const item = await db.item.update({
        where: {
          id: Number(params.itemId),
          serviceId: Number(params.id),
        },
        data: {
          name,
          description,
          priceInCents,
          serviceId: Number(params.id),
          boatAttributes: {
            upsert: {
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
                sizeInCentimeters: boatAttributes.sizeInCentimeters,
              },
              update: {
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
                sizeInCentimeters: boatAttributes.sizeInCentimeters,
              },
            },
          },
        },
      });
      return NextResponse.json(item, { status: 201 });
    } else {
      const item = await db.item.update({
        where: {
          id: Number(params.itemId),
          serviceId: Number(params.id),
        },
        data: {
          name,
          priceInCents,
          description,
          categoryId,
        },
      });
      return NextResponse.json(item, { status: 201 });
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
