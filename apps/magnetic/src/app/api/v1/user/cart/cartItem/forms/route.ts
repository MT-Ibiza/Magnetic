import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const data = await request.json();
  const { itemId, cartItemId, formData } = data;

  const existingCartItem = await db.cartItem.findFirst({
    where: { itemId: itemId, id: cartItemId },
  });

  if (!existingCartItem) {
    return NextResponse.json({ message: `Form not found` }, { status: 404 });
  }

  try {
    const cartItem = await db.cartItem.update({
      where: { id: existingCartItem.id },
      data: {
        formData,
      },
    });

    return NextResponse.json(cartItem);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
