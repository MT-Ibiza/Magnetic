import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
import { getTokenFromRequest } from '../../util';
import { sendEmail } from 'apps/magnetic/src/app/libs/emails';
import { newOrderTemplate } from 'apps/magnetic/src/app/emails/new-order';
import { Boat, BoatCharterFormData, Item } from '@magnetic/interfaces';
import moment from 'moment';

export async function POST(request: Request) {
  try {
    const body: { forms: any[] } = await request.json();
    // const { forms } = body;
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
            formData: true,
            variantId: true,
            type: true,
            item: {
              select: {
                id: true,
                name: true,
                priceInCents: true,
                serviceId: true,
                boatAttributes: true,
                service: {
                  select: {
                    id: true,
                    serviceType: true,
                  },
                },
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
      const { items } = cart;
      const orderItems =
        items.map((cartItem) => {
          const { item, quantity, variantId, id, type } = cartItem;
          return {
            quantity,
            variantId,
            priceInCents: item.priceInCents,
            itemId: item.id,
            cartItemId: id,
            type,
          };
        }) || [];

      const forms = items
        .filter((item) => {
          return item.formData !== null;
        })
        .map((cartItem) => {
          const formData = cartItem.formData as any;
          const date = formData?.date
            ? moment(formData?.date).toDate()
            : undefined;
          return {
            date,
            formData,
            serviceId: cartItem.item.serviceId,
            status: 'accepted' as 'accepted',
            cartItemId: cartItem.id,
          };
        });

      const boatForms: { data: BoatCharterFormData; item: Item }[] = items
        .filter((item) => {
          return (
            item.formData !== null &&
            item.item.service.serviceType === 'boat_rental'
          );
        })
        .map((item: any) => {
          return { data: item.formData, item: item.item };
        });

      const totalOrder = orderItems.reduce(
        (sum, item) => sum + item.priceInCents * item.quantity,
        0
      );

      const VAT_RATE = 0.21;
      const vatAmount = Math.round(totalOrder * VAT_RATE);
      const totalWithVat = totalOrder + vatAmount;

      const order = await db.order.create({
        data: {
          userId,
          totalInCents: totalOrder,
          vatInCents: vatAmount,
          totalWithVatInCents: totalWithVat,
          items: {
            createMany: {
              data: orderItems,
            },
          },
          forms: {
            createMany: {
              data: forms,
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

      try {
        await db.boatAvailability.createMany({
          data: boatForms.map((bf) => {
            const date = moment(bf.data.date).toDate();
            return {
              boatId: bf.item.boatAttributes?.id || 0,
              startDate: date,
              endDate: date,
              text: `Boat reservation: ${bf.item.name}`,
              source: 'app',
            };
          }),
        });
      } catch (error) {
        console.error('Error creating boatAvailability');
      }

      await db.cart.delete({
        where: {
          id: cart.id,
        },
      });

      try {
        await sendEmail({
          to: cart.user.email,
          subject: `New Order ${order.id}`,
          html: newOrderTemplate(order as any),
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }

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
      orderBy: {
        createdAt: 'desc',
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
