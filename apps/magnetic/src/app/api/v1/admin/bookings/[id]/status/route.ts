import { bookingStatusTemplate } from 'apps/magnetic/src/app/emails/notify-booking-changes';
import db from 'apps/magnetic/src/app/libs/db';
import { sendEmail } from 'apps/magnetic/src/app/libs/emails';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const { status, text } = data;

  const bookingDb = await db.orderBookingForm.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!bookingDb) {
    return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  }

  const order = await db.order.findUnique({
    where: { id: bookingDb.orderId },
    select: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  const orderItem = await db.orderItem.findFirst({
    where: {
      orderId: bookingDb.orderId,
      cartItemId: bookingDb.cartItemId,
    },
    select: {
      item: {
        select: {
          name: true,
        },
      },
    },
  });

  let itemName = orderItem ? orderItem.item.name : 'Product';
  itemName = bookingDb.type === 'drinks' ? 'Drinks Service' : itemName;

  try {
    const booking = await db.orderBookingForm.update({
      where: { id: bookingDb.id },
      data: {
        status: status as 'completed',
        modificationResponse: text,
      },
    });

    if (order && order.user) {
      const { user } = order;
      try {
        await sendEmail({
          to: user.email,
          subject: `Booking Updated - ${itemName}`,
          html: bookingStatusTemplate({
            username: user.name,
            bookingId: bookingDb.id,
            itemName,
          }),
        });
      } catch (emailError) {
        console.error('⚠️ Error sending email:', emailError);
      }
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
