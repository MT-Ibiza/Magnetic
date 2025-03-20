import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const bookings = await db.orderBookingForm.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        service: { 
          select: {
            id: true,
            name: true,
          },
        },
        order: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                firstName: true,
                lastName: true,
                email: true,
                accommodation: true
              },
            },
          },
        },
      },
    });

    const newBookings = bookings.filter(
      (b) => b.status === 'accepted' && !b.modificationResponse
    );

    const activeBookings = bookings.filter(
      (b) => b.status === 'accepted' && b.date && b.date > new Date()
    );

    const upcomingClients = bookings.filter(
      (b) => b.date && b.date > new Date()
    );

    return NextResponse.json({
      new: newBookings,
      active: activeBookings,
      upcoming: upcomingClients,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
