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
        items: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
            images: true,
            _count: {
              select: {
                variants: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        package: {
          select: {
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
  const packageId = data.get('packageId') as string;
  const providerId = data.get('providerId') as string;
  const serviceType = data.get('serviceType') as string;
  const script = data.get('script') as string;
  const imageFile = data.get('imageFile') as File;

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

    const updatedService = await db.service.update({
      where: {
        id: serviceFound.id,
      },
      data: {
        name: name,
        description: description,
        packageId: Number(packageId),
        providerId: providerId ? Number(providerId) : null,
        serviceType: serviceType as 'none',
        imageUrl: imageUrl,
        script,
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
