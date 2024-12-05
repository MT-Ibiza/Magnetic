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

  const admin = await db.user.findUnique({
    where: {
      email: email,
      role: 'admin',
    },
  });

  if (!admin) {
    return new Response('No user found', {
      status: 404,
    });
  }

  const matchPassword = await bcrypt.compare(password, admin.password || '');

  if (!matchPassword) {
    return new Response('Wrong password', {
      status: 401,
    });
  }

  const accessToken = signJwtAccessToken({
    id: admin.id,
    email: admin.email,
    role: admin.role,
  });

  return NextResponse.json({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    image: admin.image,
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
