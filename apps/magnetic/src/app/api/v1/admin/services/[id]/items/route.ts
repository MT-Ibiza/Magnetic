import db from 'apps/magnetic/src/app/libs/db';
import { uploadBulkImages } from 'apps/magnetic/src/app/libs/s3';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: number } }
) {
  const data = await request.formData();

  const name = data.get('name') as string;
  const description = (data.get('description') as string) || '';
  const priceInCents = Number(data.get('priceInCents') as string);
  const imageFiles = data.getAll('imageFiles') as File[];
  const categoryId = data.get('categoryId') as string;
  const boatAttributes = data.get('boatAttributes')
    ? JSON.parse(data.get('boatAttributes') as string)
    : null;
  const drinkAttributes = data.get('drinkAttributes')
    ? JSON.parse(data.get('drinkAttributes') as string)
    : null;
  const transferAttributes = data.get('transferAttributes')
    ? JSON.parse(data.get('transferAttributes') as string)
    : null;
  const childcareAttributes = data.get('childcareAttributes')
    ? JSON.parse(data.get('childcareAttributes') as string)
    : null;

  try {
    let imageUrls: string[] = [];
    if (imageFiles.length > 0) {
      const uploadedImages = await uploadBulkImages(imageFiles, 'items');
      imageUrls = uploadedImages;
    }

    const item = await db.item.create({
      data: {
        name,
        description,
        priceInCents,
        categoryId: categoryId ? Number(categoryId) : undefined,
        serviceId: Number(params.id),
        drinkAttributes: drinkAttributes
          ? {
              create: {
                units: drinkAttributes.units,
                size: drinkAttributes.size,
              },
            }
          : {},
        boatAttributes: boatAttributes
          ? {
              create: {
                boatType: boatAttributes.boatType,
                port: boatAttributes.port,
                capacity: boatAttributes.capacity,
                crew: boatAttributes.crew,
                beamInMeters: boatAttributes.beamInMeters,
                cabins: boatAttributes.cabins,
                fuelConsumption: boatAttributes.fuelConsumption,
                description: boatAttributes.description,
                latitude: boatAttributes.latitude,
                longitude: boatAttributes.longitude,
                sizeInFeet: boatAttributes.sizeInFeet,
              },
            }
          : {},
        transferAttributes: transferAttributes
          ? {
              create: {
                capacity: transferAttributes.capacity,
              },
            }
          : {},
        childcareAttributes: childcareAttributes
          ? {
              create: {
                hours: childcareAttributes.hours,
              },
            }
          : {},
      },
      include: {
        images: true,
      },
    });

    if (imageUrls.length > 0) {
      const imagePromises = imageUrls.map((url) =>
        db.image.create({
          data: {
            url,
            itemId: item.id,
          },
        })
      );
      await Promise.all(imagePromises);
    }

    return NextResponse.json(item);
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
        images: {
          select: {
            url: true,
          },
        },
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
