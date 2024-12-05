import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, description, items, packageId, providerId } =
    await request.json();

  try {
    const service = await db.service.create({
      data: {
        name: name,
        description,
        packageId,
        providerId,
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
    const services = await db.service.findMany();
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
