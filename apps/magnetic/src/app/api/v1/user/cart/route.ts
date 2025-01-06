import db from 'apps/magnetic/src/app/libs/db';
import { decodeJwtAccessToken } from 'apps/magnetic/src/app/libs/jwt';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Obtener el token del encabezado
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { message: 'No Token Provided' },
        { status: 401 }
      );
    }
    // Verificar y decodificar el token
    const decodedToken = decodeJwtAccessToken(token);
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
      },
    });

    if (!cart) {
      console.log('Cart not found for userId:', userId);
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    console.log('Cart found:', cart);
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
