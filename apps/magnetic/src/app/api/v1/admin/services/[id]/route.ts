import { EditService } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { uploadBulkImages } from 'apps/magnetic/src/app/libs/s3';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const service = await db.service.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        categories: {
          select: {
            id: true,
            name: true,
            position: true,
          },
        },
        items: {
          where: {
            published: true,
          },
          select: {
            id: true,
            name: true,
            position: true,
            images: true,
            category: {
              select: {
                id: true,
                name: true,
                position: true,
              },
            },
          },
        },
        packages: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return NextResponse.json(service);
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
  { params }: { params: { id: string } }
) {
  const data = await request.formData();
  const name = data.get('name') as string;
  const description = data.get('description') as string;
  const packageIds = data.getAll('packageIds[]') as string[];
  const providerId = data.get('providerId') as string;
  const serviceType = data.get('serviceType') as string;
  const script = data.get('script') as string;
  const imageFile = data.get('imageFile') as File;
  const termsAndConditions = data.get('termsAndConditions') as string;
  const instructions = data.get('instructions') as string;

  const serviceFound = await db.service.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!serviceFound) {
    return NextResponse.json(
      {
        message: 'Service not found',
      },
      {
        status: 404,
      }
    );
  }

  try {
    let imageUrl = serviceFound.imageUrl;

    if (imageFile) {
      const images = await uploadBulkImages([imageFile], 'services');
      imageUrl = images[0];
    }
    const providerNumberId = providerId ? Number(providerId) : null;
    const newPackageIds = packageIds.map((id) => ({ id: parseInt(id, 10) }));
    const updatedService = await db.service.update({
      where: { id: serviceFound.id },
      data: {
        name,
        description,
        packages: {
          set: [],
          connect: newPackageIds,
        },
        providerId: providerNumberId,
        serviceType: serviceType as 'none',
        imageUrl,
        script,
        termsAndConditions,
        instructions,
      },
    });

    return NextResponse.json(updatedService, { status: 201 });
  } catch (error: any) {
    console.log(error);
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
