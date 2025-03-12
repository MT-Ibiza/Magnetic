import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
import { getTokenFromRequest } from '../../util';

export async function GET(request: Request) {
  try {
    const decodedToken = getTokenFromRequest(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }
    const userId = decodedToken.id;

    const orders = await db.order.findMany({
      where: {
        userId: userId,
      },
      select: {
        forms: true,
        items: {
          select: {
            id: true,
            priceInCents: true,
            quantity: true,
            item: {
              select: {
                name: true,
                images: {
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const transformedOrders = orders
      .map((order) => {
        const itemsMap = new Map(order.items.map((i) => [i.id, i]));
        return order.forms.map((form) => ({
          booking: form,
          orderItem: itemsMap.get(form.id) || null,
        }));
      })
      .flat();

    return NextResponse.json(transformedOrders);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
