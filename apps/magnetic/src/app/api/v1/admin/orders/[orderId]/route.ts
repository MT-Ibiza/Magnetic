import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const order = await db.order.findUnique({
      where: {
        id: Number(params.orderId),
      },
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true },
        },
        items: {
          include: {
            item: {
              select: {
                name: true,
                images: true,
                service: {
                  select: {
                    id: true,
                    name: true,
                    serviceType: true,
                  },
                },
              },
            },
          },
        },
        forms: {
          include: {
            service: {
              select: {
                name: true,
                serviceType: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
    return NextResponse.json(order);
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
