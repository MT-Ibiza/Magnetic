import { EditService } from '@magnetic/interfaces';
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
        items: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
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
  const data: EditService = await request.json();
  const { name, description, packageId, providerId } = data;
  try {
    const service = await db.service.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name: name,
        description: description,
        packageId: packageId,
        providerId: providerId,
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
