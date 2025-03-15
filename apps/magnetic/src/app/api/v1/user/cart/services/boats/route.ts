import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';
import { getTokenFromRequest } from '../../../../util';

export async function POST(request: Request) {
  try {
    const decodedToken = getTokenFromRequest(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }

    const { itemId, formData, seasonId } = await request.json();
    const userId = decodedToken.id;
    const SEABOB_PRICE_CENTS = 36500;

    if (!itemId) {
      return NextResponse.json(
        { message: 'Invalid item data. Ensure itemId is provided and valid.' },
        { status: 400 }
      );
    }

    const item = await db.item.findUnique({ where: { id: itemId } });
    if (!item) {
      return NextResponse.json(
        { message: `Item with id: ${itemId} not found` },
        { status: 404 }
      );
    }

    let cart = await db.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await db.cart.create({ data: { userId } });
    }

    let seasonPrice = 0;
    if (seasonId) {
      const season = await db.seasonPrice.findUnique({
        where: { id: seasonId },
      });
      seasonPrice = season?.priceInCents || 0;
    }

    const basePrice = seasonPrice || item.priceInCents;
    const totalPrice = formData.seabob
      ? basePrice + SEABOB_PRICE_CENTS
      : basePrice;

    const newCartItem = await db.cartItem.create({
      data: {
        cartId: cart.id,
        itemId,
        quantity: 1,
        formData,
        priceInCents: totalPrice,
      },
    });

    return NextResponse.json({
      message: 'Boat added to cart successfully',
      cartItem: newCartItem,
    });
  } catch (error: any) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
