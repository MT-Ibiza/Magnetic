import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const bookings = await db.orderBookingForm.findMany({
      where: {
        order: {
          userId: Number(params.id),
        },
      },
      include: {
        order: { 
          select: {
            id: true,
            status: true,
            totalInCents: true,
            user: {
              select: {
                name: true,
              },
            },
            items: {
              select: {
                cartItemId: true,
                type: true,
                item: {
                  select: {
                    name: true,
                    images: {
                      select: {
                        url: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        service: {
          select: {
            name: true,
            serviceType: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
