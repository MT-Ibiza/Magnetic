import { NextResponse } from 'next/server';
import { EditItem } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { uploadBulkImages } from 'apps/magnetic/src/app/libs/s3';

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
        images: true,
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
  const data = await request.formData();
  const name = data.get('name') as string;
  const description = data.get('description') as string;
  const priceInCents = Number(data.get('priceInCents') as string);
  const rawBoatAttributes = data.get('boatAttributes') as string;
  const boatAttributes = rawBoatAttributes ? JSON.parse(rawBoatAttributes) : null;
  const imageFiles = data.getAll('imageFiles') as File[];

  const cleanObject = (obj: Record<string, any>) =>
    Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined));

  try {
    let newImageUrls: string[] = [];
    if (imageFiles.length > 0) {
      const uploadedImages = await uploadBulkImages(imageFiles, 'items');
      newImageUrls = uploadedImages;
    }

    const currentImages = await db.image.findMany({
      where: {
        itemId: Number(params.itemId),
      },
    });

    const currentImageUrls = currentImages.map((image) => image.url);
    const imagesToDelete = currentImageUrls.filter(
      (url) => !newImageUrls.includes(url)
    );

    if (imagesToDelete.length > 0) {
      await db.image.deleteMany({
        where: {
          url: {
            in: imagesToDelete,
          },
        },
      });
    }

    if (newImageUrls.length > 0) {
      const newImagePromises = newImageUrls.map((url) =>
        db.image.create({
          data: {
            url,
            itemId: Number(params.itemId),
          },
        })
      );
      await Promise.all(newImagePromises);
    }

    const cleanedBoatAttributes = boatAttributes
      ? {
          create: cleanObject({
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
          }),
          update: cleanObject({
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
          }),
        }
      : {};

    const item = await db.item.update({
      where: {
        id: Number(params.itemId),
        serviceId: Number(params.id),
      },
      data: {
        name,
        description,
        priceInCents,
        // boatAttributes: cleanedBoatAttributes,
      },
    });

    return NextResponse.json(item, { status: 201 });
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

