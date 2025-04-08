import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';
import { cookies } from 'next/headers';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const cartIdFromCookie = cookieStore.get('cartId')?.value;

    if (!cartIdFromCookie) {
      return NextResponse.json(null);
    }

    const cartItemId = Number(params.id);
    const cartItem = await db.cartItem.findUnique({
      where: { id: cartItemId, cartId: Number(cartIdFromCookie) },
      select: { cartId: true, type: true, formData: true },
    });

    if (!cartItem) {
      return NextResponse.json(
        { message: 'Cart item not found.' },
        { status: 404 }
      );
    }

    await db.cartItem.delete({
      where: { id: cartItemId },
    });

    if (cartItem.type === 'drinks' && cartItem.formData) {
      const anotherDrinkItem = await db.cartItem.findFirst({
        where: { cartId: cartItem.cartId, type: 'drinks', formData: undefined },
      });

      if (anotherDrinkItem) {
        await db.cartItem.update({
          where: { id: anotherDrinkItem.id },
          data: { formData: cartItem.formData },
        });
      }
    }

    const remainingItems = await db.cartItem.findMany({
      where: { cartId: cartItem.cartId },
      select: { id: true },
    });

    if (remainingItems.length === 0) {
      await db.cart.delete({
        where: { id: cartItem.cartId },
      });
      const cookieStore = cookies();
      cookieStore.delete('cartId');
      console.log('remove guest cart');
    }

    return NextResponse.json({
      message: 'Item removed successfully',
    });
  } catch (error: any) {
    console.error('Error removing item from cart:', error);

    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
