import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const data = await request.json();
  const { itemId, cartItemId, formData, quantity, variantId, seasonId } = data;
  const SEABOB_PRICE_CENTS = 36500;

  const cartItem = await db.cartItem.findFirst({
    where: { itemId: itemId, id: cartItemId },
    include: {
      item: {
        include: {
          boatAttributes: true,
          variants: {
            select: {
              id: true,
              priceInCents: true,
            },
          },
        },
      },
    },
  });

  if (!cartItem) {
    return NextResponse.json({ message: `Form not found` }, { status: 404 });
  }

  let priceItem = cartItem.priceInCents;

  if (variantId) {
    const { item } = cartItem;
    const variant = item.variants.find((v) => v.id === variantId);
    priceItem = variant?.priceInCents || priceItem;
  } else {
    const { item } = cartItem;
    priceItem = item.priceInCents;
  }

  if (seasonId) {
    const season = await db.seasonPrice.findUnique({
      where: { id: seasonId },
    });
    priceItem = season?.priceInCents || priceItem;
    priceItem = formData.seabob ? priceItem + SEABOB_PRICE_CENTS : priceItem;
  }

  try {
    const serviceWithHours = ['childcare', 'security'];
    const formWithHours = serviceWithHours.includes(cartItem.type)
      ? (formData as any)
      : undefined;
    priceItem = formWithHours
      ? Number(formWithHours?.hours) * cartItem.item.priceInCents
      : priceItem;

    const updatedCartItem = await db.cartItem.update({
      where: { id: cartItem.id },
      data: {
        formData,
        quantity,
        variantId,
        priceInCents: priceItem,
      },
    });

    return NextResponse.json(updatedCartItem);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
