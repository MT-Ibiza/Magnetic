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
    return NextResponse.json({ booking, orderItem });
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
