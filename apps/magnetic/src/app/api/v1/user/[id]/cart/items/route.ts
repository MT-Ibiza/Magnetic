import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { itemId, quantity } = await request.json();

  try {
    let cart = await db.cart.findUnique({
      where: { userId: parseInt(id) },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: parseInt(id),
        },
      });
    }

    const existingCartItem = await db.cartItem.findFirst({
      where: {
        cartId: cart.id,
        itemId: itemId,
      },
    });

    if (existingCartItem) {
      const updatedCartItem = await db.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });
      return NextResponse.json(updatedCartItem);
    }

    const newCartItem = await db.cartItem.create({
      data: {
        cartId: cart.id,
        itemId: itemId,
        quantity: quantity,
      },
    });

    return NextResponse.json(newCartItem);
  } catch (error: any) {
    console.error('Error adding item to cart:', error);
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
