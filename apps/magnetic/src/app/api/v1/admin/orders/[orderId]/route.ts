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
        guestUser: true,
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
                drinkAttributes: {
                  select: {
                    size: true,
                  }
                }
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

export async function DELETE(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    await db.order.delete({
      where: {
        id: Number(params.orderId),
      },
    });
    return NextResponse.json(
      { message: 'Order deleted successfully' },
      { status: 200 }
    );
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
