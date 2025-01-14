import { NewService } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { uploadBulkImages } from 'apps/magnetic/src/app/libs/s3';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.formData();
  const name = data.get('name') as string;
  const description = data.get('description') as string;
  const packageId = data.get('packageId') as string;
  const providerId = data.get('providerId') as string;
  const serviceType = data.get('serviceType') as string;
  const script = data.get('script') as string;
  const imageFile = data.get('imageFile') as File;

  try {
    let imageUrl = null;

    if (imageFile) {
      const images = await uploadBulkImages([imageFile], 'services');
      imageUrl = images[0];
    }

    const service = await db.service.create({
      data: {
        name: name,
        description: description,
        packageId: Number(packageId),
        providerId: providerId ? Number(providerId) : null,
        serviceType: serviceType as 'none',
        imageUrl,
        script,
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
    const providers = await db.provider.findMany({
      select: {
        id: true,
        name: true,
        website: true,
      },
    });

    const packages = await db.package.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json({ providers, packages });
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
