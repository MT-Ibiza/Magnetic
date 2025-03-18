import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await db.orderBookingForm.findUnique({
      where: { id: Number(params.id) },
    });

    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found' },
        { status: 404 }
      );
    }

    const isDrinkType = booking.type === 'drinks';

    const orderItemCondition = isDrinkType
      ? { type: booking.type }
      : { orderId: booking.orderId, type: booking.type };

    const orderItems = booking.cartItemId
      ? await db.orderItem.findMany({
          where: orderItemCondition,
          select: {
            id: true,
            priceInCents: true,
            quantity: true,
            cartItemId: true,
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
      : [];

    const order = await db.order.findUnique({
      where: { id: booking.orderId },
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
    });

    return NextResponse.json({
      booking,
      user: order?.user || null,
      orderItems,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
