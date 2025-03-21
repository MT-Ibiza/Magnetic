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
    const cart = await db.cart.findUnique({
      where: { userId },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            quantity: true,
            priceInCents: true,
            formData: true,
            variantId: true,
            type: true,
            variant: {
              select: {
                id: true,
                name: true,
                priceInCents: true,
              },
            },
            item: {
              select: {
                id: true,
                name: true,
                priceInCents: true,
                seasonPrices: {
                  select: {
                    id: true,
                    priceInCents: true,
                    startMonth: true,
                    endMonth: true,
                  },
                },

                images: {
                  select: {
                    url: true,
                  },
                },
                service: {
                  select: {
                    serviceType: true,
                    name: true,
                    id: true,
                  },
                },
                category: {
                  select: {
                    id: true,
                    name: true,
                    formType: true,
                  },
                },
                variants: {
                  select: {
                    id: true,
                    priceInCents: true,
                    name: true,
                    capacity: true,
                  },
                },
                transferAttributes: {
                  select: {
                    capacity: true,
                  },
                },
                boatAttributes: {
                  select: {
                    id: true,
                    secondName: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return NextResponse.json(cart);
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

export async function DELETE(request: Request) {
  try {
    const decodedToken = getTokenFromRequest(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }
    const userId = decodedToken.id;

    const cart = await db.cart.findUnique({
      where: { userId },
    });
    if (cart) {
      await db.cart.delete({
        where: { id: cart.id },
      });
      return NextResponse.json({ message: 'ok' });
    } else {
      return NextResponse.json(
        {
          message: 'No cart Found',
        },
        {
          status: 404,
        }
      );
    }
  } catch (error: any) {
    console.error('Error deleting cart:', error);
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
