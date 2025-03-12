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
    return NextResponse.json({ booking, orderItem, user: order?.user });
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
