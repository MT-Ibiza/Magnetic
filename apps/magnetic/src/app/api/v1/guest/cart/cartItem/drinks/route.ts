import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';
import { cookies } from 'next/headers';
//@ts-ignore
import { serialize } from 'cookie';

export async function POST(request: Request) {
  try {
    const { itemId, quantity, formData } = await request.json();

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

    let cart;
    let cartIdCookie;
    const cookieStore = cookies();

    const cartIdFromCookie = cookieStore.get('cartId')?.value;
    console.log('cartIdFromCookie: ', cartIdFromCookie);

    if (cartIdFromCookie) {
      cart = await db.cart.findUnique({
        where: { id: parseInt(cartIdFromCookie) },
      });
    }

    if (!cart) {
      cart = await db.cart.create({ data: {} });
      cartIdCookie = serialize('cartId', cart.id.toString(), {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 días
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
      console.log('cartIdCookie: ', cartIdCookie);
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
