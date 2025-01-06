import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';
import { decodeJwtAccessToken } from 'apps/magnetic/src/app/libs/jwt';

export async function POST(request: Request) {
  try {
    // Obtener el token del encabezado
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    console.log('--------------------------------');
    console.log('token: ', token);
    console.log('--------------------------------');
    if (!token) {
      return NextResponse.json(
        { message: 'No Token Provided' },
        { status: 401 }
      );
    }

    // Verificar y decodificar el token
    const decodedToken = decodeJwtAccessToken(token);
    console.log('--------------------------------');
    console.log('decodedToken: ', decodedToken);
    console.log('--------------------------------');
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }

    const userId = decodedToken.id;

    // Parsear el cuerpo de la solicitud
    const body = await request.json();
    const { itemId, quantity } = body;

    if (!itemId || !quantity || quantity <= 0) {
      return NextResponse.json(
        {
          message:
            'Invalid item data. Ensure itemId and quantity are provided and valid.',
        },
        { status: 400 }
      );
    }

    // Buscar o crear el carrito del usuario
    let cart = await db.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId,
        },
      });
    }

    // Verificar si el ítem ya está en el carrito
    const existingCartItem = await db.cartItem.findFirst({
      where: {
        cartId: cart.id,
        itemId: itemId,
      },
    });

    // Actualizar o crear el ítem en el carrito
    if (existingCartItem) {
      const updatedCartItem = await db.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });

      return NextResponse.json({
        message: 'Cart item updated successfully',
        cartItem: updatedCartItem,
      });
    }

    const newCartItem = await db.cartItem.create({
      data: {
        cartId: cart.id,
        itemId: itemId,
        quantity: quantity,
      },
    });

    return NextResponse.json({
      message: 'Item added to cart successfully',
      cartItem: newCartItem,
    });
  } catch (error: any) {
    console.error('Error adding item to cart:', error);

    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log('Fetching cart for userId:', id);

  try {
    const cart = await db.cart.findUnique({
      where: { userId: parseInt(id) },
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
      console.log('Cart not found for userId:', id);
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
