import { NewProvider } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data: NewProvider = await request.json();
  const { name, email, website } = data;

  try {
    const provider = await db.provider.create({
      data,
    });
    return NextResponse.json(provider);
  } catch (error: any) {
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

export async function GET(request: Request) {
  try {
    const providers = await db.provider.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(providers);
  } catch (error: any) {
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
