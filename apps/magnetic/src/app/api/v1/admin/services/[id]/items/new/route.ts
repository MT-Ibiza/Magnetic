import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const service = await db.service.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    const categories = await db.category.findMany({
      where: {
        serviceId: service?.id,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    const data = {
      service,
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
