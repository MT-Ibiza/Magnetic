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
      : {
          orderId: booking.orderId,
          type: booking.type,
          cartItemId: booking.cartItemId,
        };

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
                images: {
                  select: {
                    url: true,
                  },
                },
                seasonPrices: true,
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { orderItemId, formData, quantity } = await request.json();
  const bookingId = Number(params.id);
  const booking = await db.orderBookingForm.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  }

  const orderItem = await db.orderItem.findUnique({
    where: { id: orderItemId },
    include: {
      item: true,
    },
  });

  if (!orderItem) {
    return NextResponse.json(
      { message: `Order item not found` },
      { status: 404 }
    );
  }

  try {
    const booking = await db.orderBookingForm.update({
      where: { id: bookingId },
      data: {
        formData,
        status: 'completed',
      },
    });

    const orderItemDb = await db.orderItem.update({
      where: { id: orderItemId },
      data: {
        quantity,
      },
    });

    return NextResponse.json(booking);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
