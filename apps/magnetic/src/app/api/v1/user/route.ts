import { NextResponse } from 'next/server';
import { getTokenFromRequest } from '../util';
import db from '../../../libs/db';

export async function GET(request: Request) {
  try {
    const decodedToken = getTokenFromRequest(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }
    const userId = decodedToken.id;
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        accommodation: true,
        arrivalDate: true,
        departureDate: true,
        package: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: 'No user session',
        },
        {
          status: 400,
        }
      );
    }

    const cart = await db.cart.findUnique({
      where: {
        userId: userId,
      },
    });
    return NextResponse.json({ ...user, ...{ cartId: cart?.id } });
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
