import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await db.orderBookingForm.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    const orderItem = booking?.id
      ? await db.orderItem.findUnique({
          where: {
            id: booking?.id,
          },
          select: {
            id: true,
            priceInCents: true,
            quantity: true,
            type: true,
            item: {
              select: {
                id: true,
                name: true,
                priceInCents: true,
                variants: true,
              },
            },
            variant: {
              select: {
                id: true,
                name: true,
                priceInCents: true,
              },
            },
          },
        })
      : null;

    const orderItems =
      booking?.id && booking.cartItemId
        ? await db.orderItem.findMany({
            where: {
              orderId: booking.orderId,
              type: booking.type,
            },
            select: {
              id: true,
              priceInCents: true,
              quantity: true,
              item: {
                select: {
                  id: true,
                  name: true,
                  priceInCents: true,
                  variants: true,
                },
              },
              variant: {
                select: {
                  id: true,
                  name: true,
                  priceInCents: true,
                },
              },
            },
          })
        : null;

    const order = booking?.id
      ? await db.order.findUnique({
          where: {
            id: booking.orderId,
          },
          select: {
            user: {
              select: {
                id: true,
                name: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        })
      : null;
    return NextResponse.json({
      booking,
      orderItem,
      user: order?.user,
      orderItems,
    });
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
