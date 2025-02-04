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
        drinkAttributes: true,
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
      where: {
        serviceId: item?.serviceId,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
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
  { params }: { params: { id: number; itemId: number } }
) {
  const data = await request.formData();

  const name = data.get('name') as string;
  const description = data.get('description') as string;
  const priceInCents = Number(data.get('priceInCents') as string);
  const boatAttributes = data.get('boatAttributes')
    ? JSON.parse(data.get('boatAttributes') as string)
    : null;
  const drinkAttributes = data.get('drinkAttributes')
    ? JSON.parse(data.get('drinkAttributes') as string)
    : null;
  const imageFiles = data.getAll('imageFiles') as File[];

  try {
    let imageUrls: string[] = [];
    if (imageFiles.length > 0) {
      const uploadedImages = await uploadBulkImages(imageFiles, 'items');
      imageUrls = uploadedImages;
    }

    const updatedItem = await db.item.update({
      where: {
        id: Number(params.itemId),
        serviceId: Number(params.id),
      },
      data: {
        name,
        description,
        priceInCents,
        serviceId: Number(params.id),
        ...(boatAttributes && {
          boatAttributes: {
            upsert: {
              create: {
                ...boatAttributes,
              },
              update: {
                ...boatAttributes,
              },
            },
          },
        }),
        ...(drinkAttributes && {
          drinkAttributes: {
            upsert: {
              create: {
                ...drinkAttributes,
              },
              update: {
                ...drinkAttributes,
              },
            },
          },
        }),
      },
    });

    if (imageUrls.length > 0) {
      const imagePromises = imageUrls.map((url) =>
        db.image.create({
          data: {
            url,
            itemId: updatedItem.id,
          },
        })
      );
      await Promise.all(imagePromises);
    }

    return NextResponse.json(updatedItem);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
