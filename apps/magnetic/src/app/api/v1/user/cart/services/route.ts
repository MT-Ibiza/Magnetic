import { NextResponse } from 'next/server';
import db from 'apps/magnetic/src/app/libs/db';
import { getTokenFromRequest } from '../../../util';

export async function POST(request: Request) {
  try {
    const decodedToken = getTokenFromRequest(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }

    const userId = decodedToken.id;
    const body = await request.json();
    const { itemId, cartItemId, quantity, formData, variantId } = body;

    if (!itemId || quantity < 0) {
      return NextResponse.json(
        {
          message:
            'Invalid item data. Ensure itemId and quantity are provided and valid.',
        },
        { status: 400 }
      );
    }

    let cart = await db.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId,
        },
      });
    }

    if (cartItemId) {
      const existingCartItem = await db.cartItem.findFirst({
        where: {
          cartId: cart.id,
          id: cartItemId,
        },
      });

      if (!existingCartItem) {
        return NextResponse.json(
          {
            message: 'Item cart not found',
          },
          { status: 400 }
        );
      }

      if (quantity === 0) {
        const updatedCartItem = await db.cartItem.delete({
          where: { id: cartItemId },
        });
        return NextResponse.json({
          message: 'Cart item removed successfully',
          cartItem: updatedCartItem,
        });
      }

      const newCartItem = await db.cartItem.create({
        data: {
          cartId: cart.id,
          itemId: itemId,
          quantity: quantity,
          formData: formData,
          variantId,
        },
      });
      return NextResponse.json({
        message: 'Item added to cart successfully',
        cartItem: newCartItem,
      });
    } else {
      const newCartItem = await db.cartItem.create({
        data: {
          cartId: cart.id,
          itemId: itemId,
          quantity: quantity,
          formData: formData,
          variantId,
        },
      });
      return NextResponse.json({
        message: 'Item added to cart successfully',
        cartItem: newCartItem,
      });
    }
  } catch (error: any) {
    console.error('Error adding item to cart:', error);

    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

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

export async function DELETE(request: Request) {
  try {
    const decodedToken = getTokenFromRequest(request);
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }

    const userId = decodedToken.id;

    const body = await request.json();
    const { itemId, quantity } = body;

    if (!itemId || !quantity || quantity < 0) {
      return NextResponse.json(
        {
          message:
            'Invalid item data. Ensure itemId and quantity are provided and valid.',
        },
        { status: 400 }
      );
    }

    let cart = await db.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId,
        },
      });
    }

    const existingCartItem = await db.cartItem.findFirst({
      where: {
        cartId: cart.id,
        itemId: itemId,
      },
    });

    if (existingCartItem) {
      const updatedCartItem = await db.cartItem.update({
        where: { id: existingCartItem.id },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
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
      },
    });

    return NextResponse.json({
      message: 'Item added to cart successfully',
      cartItem: newCartItem,
    });
  } catch (error: any) {
    console.error('Error adding item to cart:', error);

    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
