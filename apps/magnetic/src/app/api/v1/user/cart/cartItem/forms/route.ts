import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const data = await request.json();
  const { itemId, cartItemId, formData, quantity, variantId, seasonId } = data;

  const cartItem = await db.cartItem.findFirst({
    where: { itemId: itemId, id: cartItemId },
    include: {
      item: {
        include: {
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
  }

  try {
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
