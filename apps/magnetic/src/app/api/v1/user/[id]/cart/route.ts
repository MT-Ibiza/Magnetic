import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log('Fetching cart for userId:', id);

  try {
    const cart = await db.cart.findUnique({
      where: { userId: parseInt(id) },
      include: {
        items: {
          select: {
            id: true,
            quantity: true,
            item: {
              select: {
                id: true,
                name: true,
                priceInCents: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      console.log('Cart not found for userId:', id);
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }

    console.log('Cart found:', cart);
    return NextResponse.json(cart);
  } catch (error: any) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
