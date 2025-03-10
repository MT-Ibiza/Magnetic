import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';
import {
  deleteImageFromSpaces,
  uploadBulkImages,
} from 'apps/magnetic/src/app/libs/s3';

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
        transferAttributes: true,
        seasonPrices: true,
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
  const transferAttributes = data.get('transferAttributes')
    ? JSON.parse(data.get('transferAttributes') as string)
    : null;
  const imageFiles = data.getAll('imageFiles') as File[];
  const categoryId = data.get('categoryId') as string;
  const removeImagesIds = data.getAll('removeImagesIds') as string[];

  try {
    if (removeImagesIds.length > 0) {
      const ids = removeImagesIds.map((id) => Number(id));
      const imagesToRemove = await db.image.findMany({
        where: { id: { in: ids }, itemId: Number(params.itemId) },
      });

      await Promise.all(
        imagesToRemove.map((image) => deleteImageFromSpaces(image.url))
      );

      await db.image.deleteMany({
        where: {
          id: { in: ids },
          itemId: Number(params.itemId),
        },
      });
    }

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
        categoryId: categoryId ? Number(categoryId) : undefined,
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
        ...(transferAttributes && {
          transferAttributes: {
            upsert: {
              create: {
                ...transferAttributes,
              },
              update: {
                ...transferAttributes,
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: number; itemId: number } }
) {
  try {
    await db.item.delete({
      where: {
        id: Number(params.itemId),
        serviceId: Number(params.id),
      },
    });
    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
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
