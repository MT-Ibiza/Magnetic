import db from 'apps/magnetic/src/app/libs/db';
import { getParamsFromUrl } from 'apps/magnetic/src/app/services/products';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Desactiva la optimización estática

export async function GET(req: NextRequest) {
  try {
    const { page, pageSize } = getParamsFromUrl(req.nextUrl.searchParams);
    const offset = (page - 1) * pageSize;

    const allBookings = await db.orderBookingForm.findMany({
      skip: offset,
      take: pageSize,
      include: {
        order: {
          include: {
            items: {
              select: {
                id: true,
                priceInCents: true,
                quantity: true,
                cartItemId: true,
                variant: {
                  select: {
                    id: true,
                    name: true,
                    priceInCents: true,
                  },
                },
                item: {
                  select: {
                    name: true,
                    serviceId: true,
                    drinkAttributes: {
                      select: {
                        id: true,
                      },
                    },
                    images: {
                      select: {
                        url: true,
                      },
                    },
                  },
                },
              },
            },
            user: true,
            guestUser: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    const bookings = allBookings
      .map((fullBooking) => {
        const {
          order: { user, guestUser, items },
        } = fullBooking;
        const { order, ...form } = fullBooking;
        return {
          booking: form,
          user: user,
          guestUser: guestUser,
          orderItems: items.filter(
            (itemCart) => itemCart.cartItemId === form.cartItemId
          ),
        };
      })
      .flat();

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
