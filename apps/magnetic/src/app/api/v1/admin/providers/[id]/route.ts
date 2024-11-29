import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const provider = await db.provider.findUnique({
      where: {
        id: Number(params.id),
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { name } = await request.json();
  try {
    const provider = await db.provider.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name: name,
      },
    });
    return NextResponse.json(provider, { status: 201 });
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
