import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const orders = await db.order.findMany({
      select: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
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
          user: order.user,
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
