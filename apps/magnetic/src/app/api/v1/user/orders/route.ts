import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
import { getTokenFromRequest } from '../../util';
import { sendEmail } from 'apps/magnetic/src/app/libs/emails';
import { newOrderTemplate } from 'apps/magnetic/src/app/emails/new-order';

export async function POST(request: Request) {
  try {
    const body: { forms: any[] } = await request.json();
    const { forms } = body;
    const decodedToken = getTokenFromRequest(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }
    const userId = decodedToken.id;
    const cart = await db.cart.findUnique({
      where: { userId },
      include: {
        items: {
          select: {
            id: true,
            quantity: true,
            item: {
              select: {
                id: true,
                name: true,
                priceInCents: true,
              },
            },
          },
        },
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (cart) {
      const items =
        cart?.items.map((cartItem) => {
          const { item, quantity } = cartItem;
          return {
            quantity,
            priceInCents: item.priceInCents,
            itemId: item.id,
          };
        }) || [];

      const totalOrder = items.reduce(
        (sum, item) => sum + item.priceInCents * item.quantity,
        0
      );

      const order = await db.order.create({
        data: {
          userId,
          totalInCents: totalOrder,
          items: {
            createMany: {
              data: items,
            },
          },
          forms: {
            createMany: {
              data: forms.map((form) => {
                return {
                  formData: form.data,
                  serviceId: form.serviceId,
                };
              }),
            },
          },
        },
        include: {
          items: {
            include: {
              item: true,
            },
          },
          user: true,
        },
      });

      await sendEmail({
        to: cart.user.email,
        subject: `New Order ${order.id}`,
        html: newOrderTemplate(order as any),
      });

      await db.cart.delete({
        where: {
          id: cart.id,
        },
      });

      return NextResponse.json(order);
    } else {
      return NextResponse.json(
        {
          message: 'Cart Not Found',
        },
        {
          status: 400,
        }
      );
    }
  } catch (error: any) {
    console.error('Error creating order:', error);
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

export async function GET(request: Request) {
  try {
    const decodedToken = getTokenFromRequest(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }
    const userId = decodedToken.id;
    const orders = await db.order.findMany({
      where: { userId },
      include: {
        items: {
          select: {
            id: true,
            quantity: true,
            item: {
              select: {
                id: true,
                name: true,
                priceInCents: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(orders);
  } catch (error: any) {
    console.error('Error fetching cart:', error);
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
