import db from 'apps/magnetic/src/app/libs/db';
import moment from 'moment';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Desactiva la optimización estática

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
                accommodation: true,
                arrivalDate: true,
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
      },
    });

    const today = moment().startOf('day').toDate();
    const futureDate = moment().add(30, 'days').endOf('day').toDate();

    const users = await db.user.findMany({
      where: {
        arrivalDate: {
          gte: today,
          lte: futureDate,
        },
      },
      select: {
        firstName: true,
        lastName: true,
        arrivalDate: true,
        id: true,
        name: true,
        email: true,
        accommodation: true,
      },
    });

    const newBookings = bookings.filter(
      (b) => b.status === 'accepted' && b.date && b.date > new Date()
    );

    const activeBookings = bookings.filter((b) =>
      ['modification_requested', 'accepted'].includes(b.status)
    );

    const upcomingClients = bookings.filter(
      (b) => b.date && b.date > new Date()
    );

    return NextResponse.json({
      new: newBookings,
      active: activeBookings,
      upcoming: users,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
