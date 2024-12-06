import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name } = await request.json();

  try {
    const provider = await db.provider.create({
      data: {
        name: name,
      },
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
    const providers = await db.provider.findMany();
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
