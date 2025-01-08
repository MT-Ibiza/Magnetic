import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
import { getTokenFromRequest } from '../../util';

export async function GET(request: Request) {
  try {
    // Obtener el token del encabezado
    const decodedToken = getTokenFromRequest(request);
    // Verificar y decodificar el token
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
                service: {
                  select: {
                    serviceType: true,
                    name: true,
                    id: true,
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
