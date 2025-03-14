import { NextResponse } from 'next/server';
import { getTokenFromRequest } from '../../../../util';
import db from 'apps/magnetic/src/app/libs/db';

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

    const booking = await db.orderBookingForm.update({
      where: {
        id: Number(params.id),
      },
      data: {
        status: 'modification_requested',
        modificationRequest: message,
      },
    });

    return NextResponse.json(booking);
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
