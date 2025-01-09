import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const bookings = await db.orderBookingForm.findMany({
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
      {
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
