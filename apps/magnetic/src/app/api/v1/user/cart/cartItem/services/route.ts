import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';
import { getTokenFromRequest } from '../../../../util';

export async function POST(request: Request) {
  try {
    const decodedToken = getTokenFromRequest(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }

    const userId = decodedToken.id;
    const body = await request.json();
    const { itemId, cartItemId, quantity, formData, variantId } = body;

    if (!itemId || quantity < 0) {
      return NextResponse.json(
        {
          message:
            'Invalid item data. Ensure itemId and quantity are provided and valid.',
        },
        { status: 400 }
      );
    }

    const item = await db.item.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!item) {
      return NextResponse.json(
        {
          message: `Item with id: ${itemId} not found`,
        },
        { status: 404 }
      );
    }

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

    if (cartItemId) {
      const existingCartItem = await db.cartItem.findFirst({
        where: {
          cartId: cart.id,
          id: cartItemId,
        },
      });

      if (!existingCartItem) {
        return NextResponse.json(
          {
            message: 'Item cart not found',
          },
          { status: 400 }
        );
      }

      if (quantity === 0) {
        const updatedCartItem = await db.cartItem.delete({
          where: { id: cartItemId },
        });
        return NextResponse.json({
          message: 'Cart item removed successfully',
          cartItem: updatedCartItem,
        });
      }

      const newCartItem = await db.cartItem.create({
        data: {
          cartId: cart.id,
          itemId: itemId,
          quantity: quantity,
          formData: formData,
          priceInCents: item.priceInCents,
          variantId,
        },
      });
      return NextResponse.json({
        message: 'Item added to cart successfully',
        cartItem: newCartItem,
      });
    } else {
      const newCartItem = await db.cartItem.create({
        data: {
          cartId: cart.id,
          itemId: itemId,
          quantity: quantity,
          formData: formData,
          variantId,
          priceInCents: item.priceInCents,
        },
      });
      return NextResponse.json({
        message: 'Item added to cart successfully',
        cartItem: newCartItem,
      });
    }
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
