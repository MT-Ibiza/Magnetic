import db from 'apps/magnetic/src/app/libs/db';
import moment from 'moment';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Desactiva la optimización estática

export async function GET(request: Request) {
  try {
    const bookings = await db.orderBookingForm.findMany({
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

    const now = moment();
    const sevenDaysAgo = now
      .clone()
      .subtract(7, 'days')
      .startOf('day')
      .toDate();
    const today = now.clone().startOf('day').toDate();
    const in14Days = now.clone().add(14, 'days').endOf('day').toDate();

    const newBookings = bookings
      .filter((b) => b.date && b.date >= sevenDaysAgo)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const activeBookings = bookings
      .filter((b) => b.date && b.date >= today && b.date <= in14Days)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const statusPending = ['modification_requested', 'pending'];
    const pendingBookings = bookings
      .filter((b) => statusPending.includes(b.status) && b.date)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json({
      new: newBookings,
      active: activeBookings,
      pending: pendingBookings,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
