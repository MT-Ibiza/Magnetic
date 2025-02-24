import db from 'apps/magnetic/src/app/libs/db';
import { uploadBulkImages } from 'apps/magnetic/src/app/libs/s3';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.formData();
  const name = data.get('name') as string;
  const description = data.get('description') as string;
  const packageIds = data.getAll('packageIds[]') as string[];
  const providerId = data.get('providerId') as string;
  const serviceType = data.get('serviceType') as string;
  const script = data.get('script') as string;
  const imageFile = data.get('imageFile') as File;
  const termsAndConditions = data.get('termsAndConditions') as string;
  try {
    let imageUrl = null;
    if (imageFile) {
      const images = await uploadBulkImages([imageFile], 'services');
      imageUrl = images[0];
    }
    const providerNumberId = providerId ? Number(providerId) : null;
    const service = await db.service.create({
      data: {
        name: name,
        description: description,
        packages: {
          connect: packageIds.map((id) => ({ id: parseInt(id, 10) })),
        },
        providerId: providerNumberId,
        serviceType: serviceType as 'none',
        imageUrl,
        script,
        termsAndConditions,
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

export async function GET(request: Request) {
  try {
    const services = await db.service.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        serviceType: true,
        position: true,
        packages: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        position: 'asc',
      },
    });
    return NextResponse.json(services);
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
