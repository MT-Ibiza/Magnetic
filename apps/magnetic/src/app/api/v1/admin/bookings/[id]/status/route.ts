import { bookingStatusTemplate } from 'apps/magnetic/src/app/emails/notify-booking-changes';
import db from 'apps/magnetic/src/app/libs/db';
import { sendEmail } from 'apps/magnetic/src/app/libs/emails';
import moment from 'moment';
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
    return NextResponse.json(
      {
        message: 'Booking not found',
      },
      {
        status: 404,
      }
    );
  }

  const order = await db.order.findUnique({
    where: {
      id: bookingDb.orderId,
    },
    select: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  try {
    const booking = await db.orderBookingForm.update({
      where: {
        id: bookingDb.id,
      },
      data: {
        status: status as 'completed',
        modificationResponse: text,
      },
    });

    if (order) {
      const { user } = order;
      await sendEmail({
        to: user.email,
        subject: `Booking Changes`,
        html: bookingStatusTemplate({
          username: user.name,
          bookingId: bookingDb.id,
          bookingDate: moment(bookingDb.date).format('D MMM YYYY'),
          status,
        }),
      });
    }
    return NextResponse.json(booking, { status: 201 });
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
