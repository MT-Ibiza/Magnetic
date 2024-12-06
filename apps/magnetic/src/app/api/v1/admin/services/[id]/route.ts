import db from 'apps/magnetic/src/app/libs/db';
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
        items: true,
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
  const { name } = await request.json();
  try {
    const service = await db.service.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name: name,
      },
    });
    return NextResponse.json(service, { status: 201 });
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
