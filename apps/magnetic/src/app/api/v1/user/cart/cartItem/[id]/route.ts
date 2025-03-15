import { NextResponse } from 'next/server';
import { getTokenFromRequest } from '../../../../util';
import db from 'apps/magnetic/src/app/libs/db';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const decodedToken = getTokenFromRequest(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }
    const cartItemId = Number(params.id);
    const cartItem = await db.cartItem.findUnique({
      where: { id: cartItemId },
      select: { cartId: true },
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

    const remainingItems = await db.cartItem.findMany({
      where: { cartId: cartItem.cartId },
      select: { id: true },
    });

    if (remainingItems.length === 0) {
      await db.cart.delete({
        where: { id: cartItem.cartId },
      });
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
