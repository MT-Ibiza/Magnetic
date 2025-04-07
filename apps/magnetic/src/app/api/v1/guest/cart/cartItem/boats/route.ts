import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';
import { cookies } from 'next/headers';
//@ts-ignore
import { serialize } from 'cookie';

export async function POST(request: Request) {
  try {
    const { itemId, formData, seasonId } = await request.json();
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
      // Establece cookie con cartId
      cartIdCookie = serialize('cartId', cart.id.toString(), {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 días
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
      console.log('cartIdCookie: ', cartIdCookie);
    }

    // Calcular precio
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
        type: 'boat_rental',
      },
    });

    const response = NextResponse.json({
      message: 'Boat added to cart successfully',
      cartItem: newCartItem,
    });

    if (cartIdCookie) {
      response.headers.set('Set-Cookie', cartIdCookie);
    }

    return response;
  } catch (error: any) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
