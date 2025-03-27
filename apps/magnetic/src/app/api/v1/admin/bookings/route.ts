import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Desactiva la optimización estática

export async function GET() {
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
        return order.forms.map((form) => ({
          user: order.user,
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
