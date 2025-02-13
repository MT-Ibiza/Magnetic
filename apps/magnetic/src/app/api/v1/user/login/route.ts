import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from 'apps/magnetic/src/app/libs/db';
import { signJwtAccessToken } from 'apps/magnetic/src/app/libs/jwt';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  if (!email || !password) {
    return new Response('Email and password are required', {
      status: 400,
    });
  }

  const client = await db.user.findUnique({
    where: {
      email: email,
      role: 'client',
    },
    include: {
      package: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!client) {
    return new Response('No user found', {
      status: 404,
    });
  }

  const matchPassword = await bcrypt.compare(password, client.password || '');

  if (!matchPassword) {
    return new Response('Wrong password', {
      status: 401,
    });
  }

  const accessToken = signJwtAccessToken({
    id: client.id,
    email: client.email,
    role: client.role,
  });

  const cart = await db.cart.findUnique({
    where: {
      userId: client.id,
    },
  });

  return NextResponse.json({
    name: client.name,
    email: client.email,
    arrivalDate: client.arrivalDate,
    phone: client.phone,
    image: client.image,
    package: client.package,
    cartId: cart?.id,
    accessToken,
  });
}

//cors error
export async function GET(req: NextRequest) {
  return NextResponse.json(
    {
      error: 'Nothing',
    },
    { status: 404 }
  );
}
