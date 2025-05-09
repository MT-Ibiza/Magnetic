import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
import { getTokenFromRequest } from '../../util';
import { BoatCharterFormData, GuestUser, Item } from '@magnetic/interfaces';
import { centsFixed } from '@magnetic/utils';
import { cookies } from 'next/headers';
import moment from 'moment';
import { sendEmailOrder } from '../payment/_service';

export async function POST(request: Request) {
  try {
    const guestUser: GuestUser = await request.json();

    const cookieStore = cookies();

    const cartIdFromCookie = guestUser?.email
      ? cookieStore.get('cartId')?.value
      : undefined;

    console.log('Guest cart: ', cartIdFromCookie);

    let userId = 0;

    if (!cartIdFromCookie) {
      const decodedToken = getTokenFromRequest(request);
      if (!decodedToken) {
        return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
      }
      userId = decodedToken.id;
    }

    const cart = await db.cart.findUnique({
      where: cartIdFromCookie ? { id: Number(cartIdFromCookie) } : { userId },
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
          const formReservation = cartItem.type === 'reservations';
          const status = formReservation ? 'pending' : 'accepted';
          const date = formData?.date
            ? moment(formData?.date).toDate()
            : moment().toDate();
          return {
            date,
            formData,
            serviceId: cartItem.item.serviceId as number,
            status: status as 'accepted',
            cartItemId: cartItem.id,
            type: cartItem.type,
          };
        });

      const boatForms: { data: BoatCharterFormData; item: Item }[] = items
        .filter((item) => {
          return (
            item.formData !== null &&
            item.item.service?.serviceType === 'boat_rental'
          );
        })
        .map((item: any) => {
          return { data: item.formData, item: item.item, type: 'boat_rental' };
        });

      const totalOrder = orderItems.reduce(
        (sum, item) => sum + item.priceInCents * item.quantity,
        0
      );

      // const VAT_RATE = 0.21;
      const FEE_RATE = 0.02;

      const vat = totalOrder - totalOrder / 1.21;
      const vatInCents = centsFixed(vat);

      const feeInCents = guestUser.isOnlyOrden ? 0 : totalOrder * FEE_RATE;
      const total = totalOrder + feeInCents;

      let newGuestId;

      if (guestUser?.email) {
        const guestUserDb = await db.guestUser.create({
          data: {
            name: guestUser.name,
            email: guestUser.email,
            passportNumber: guestUser.passportNumber,
            billingAddress: guestUser.billingAddress,
            phone: guestUser.phone,
            companyName: guestUser.companyName,
          },
        });
        newGuestId = guestUserDb.id;
      }

      const order = await db.order.create({
        data: {
          userId: userId || undefined,
          totalInCents: total,
          vatInCents: vatInCents,
          feeInCents: feeInCents,
          guestUserId: newGuestId,
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
          guestUser: true,
          forms: true,
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

      if (cartIdFromCookie) {
        await db.cart.delete({
          where: {
            id: cart.id,
          },
        });
        if (guestUser.sendEmail) {
          await db.order.update({
            where: {
              id: order.id,
            },
            data: {
              status: 'success',
            },
          })
          await sendEmailOrder(order as any);
        }
      }

      if (totalOrder === 0) { // Order only with reservations
        await db.cart.deleteMany({
          where: {
            userId: userId,
          },
        });
        await db.order.update({
          where: {
            id: order.id,
          },
          data: {
            status: 'success',
          },
        })
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
