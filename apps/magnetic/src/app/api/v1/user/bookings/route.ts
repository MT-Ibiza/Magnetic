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
        forms: {
          where: {
            status: {
              not: 'cancelled',
            },
          },
        },
        items: {
          select: {
            id: true,
            priceInCents: true,
            quantity: true,
            cartItemId: true,
            variant: {
              select: {
                id: true,
                name: true,
                priceInCents: true,
              },
            },
            item: {
              select: {
                name: true,
                serviceId: true,
                drinkAttributes: {
                  select: {
                    id: true,
                  },
                },
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
        // const itemsMap = new Map(order.items.map((i) => [i.id, i]));
        return order.forms.map((form) => ({
          booking: form,
          orderItem: order.items.find(
            (itemCart) => itemCart.cartItemId === form.cartItemId
          ),
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
