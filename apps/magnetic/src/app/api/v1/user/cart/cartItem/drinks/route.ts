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
    const { itemId, quantity, formData } = body;

    if (!itemId || quantity < 0) {
      return NextResponse.json(
        {
          message:
            'Invalid item data. Ensure itemId and quantity are provided and valid.',
        },
        { status: 400 }
      );
    }

    const item = await db.item.findUnique({ where: { id: itemId } });
    if (!item) {
      return NextResponse.json(
        { message: `Drink with id: ${itemId} not found` },
        { status: 404 }
      );
    }

    let cart = await db.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await db.cart.create({ data: { userId } });
    }

    const existingCartItem = await db.cartItem.findFirst({
      where: { cartId: cart.id, itemId: itemId },
    });

    if (quantity === 0 && existingCartItem) {
      const updatedCartItem = await db.cartItem.delete({
        where: { id: existingCartItem.id },
      });

      if (existingCartItem.formData) {
        const anotherDrinkItem = await db.cartItem.findFirst({
          where: { cartId: cart.id, type: 'drinks', formData: undefined },
        });

        if (anotherDrinkItem) {
          await db.cartItem.update({
            where: { id: anotherDrinkItem.id },
            data: { formData: existingCartItem.formData },
          });
        }
      }

      const remainingItems = await db.cartItem.count({
        where: { cartId: cart.id },
      });

      if (remainingItems === 0) {
        await db.cart.delete({ where: { id: cart.id } });
      }

      return NextResponse.json({
        message: 'Cart item removed successfully',
        cartItem: updatedCartItem,
      });
    }

    if (quantity > 0 && existingCartItem) {
      const updatedCartItem = await db.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: quantity },
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
        formData: formData,
        priceInCents: item.priceInCents,
        type: 'drinks',
      },
    });

    return NextResponse.json({
      message: 'Drink added to cart successfully',
      cartItem: newCartItem,
    });
  } catch (error: any) {
    console.error('Error adding drink to cart:', error);

    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
