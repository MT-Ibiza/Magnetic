import { NextResponse } from 'next/server';
import { getTokenFromRequest } from '../../../../util';
import db from 'apps/magnetic/src/app/libs/db';
import { sendEmail } from 'apps/magnetic/src/app/libs/emails';
import { modifyRequestTemplate } from 'apps/magnetic/src/app/emails/modify-booking';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const decodedToken = getTokenFromRequest(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }

    const body = await request.json();
    const { message } = body;
    const { id } = decodedToken;

    const user = await db.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: 'User not found',
        },
        {
          status: 404,
        }
      );
    }

    const booking = await db.orderBookingForm.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          message: 'Booking not found',
        },
        {
          status: 404,
        }
      );
    }

    const bookingUpdated = await db.orderBookingForm.update({
      where: {
        id: Number(params.id),
      },
      data: {
        status: 'modification_requested',
        modificationRequest: message,
      },
    });

    const orderItem = await db.orderItem.findFirst({
      where: {
        orderId: booking.orderId,
        cartItemId: booking.cartItemId,
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
    itemName = booking.type === 'drinks' ? 'Drinks Service' : itemName;

    try {
      await sendEmail({
        to: user.email,
        subject: `Request Received - ${itemName}`,
        html: modifyRequestTemplate({
          message: message,
          clientName: user.firstName,
          itemName: itemName,
          bookingId: bookingUpdated.id,
        }),
        cc: process.env.EMAIL_COPY,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }

    return NextResponse.json(bookingUpdated);
  } catch (error: any) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      {
        message: error.message || 'An error occurred while updating booking',
      },
      {
        status: 500,
      }
    );
  }
}
