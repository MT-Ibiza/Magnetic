import { NewService } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const params: NewService = await request.json();
  const { name, description, items, packageId } = params;

  try {
    const service = await db.service.create({
      data: {
        name: name,
        description,
        packageId,
        items: {
          createMany: {
            data: items,
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
