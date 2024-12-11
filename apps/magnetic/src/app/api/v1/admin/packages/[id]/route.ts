import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const packageFound = await db.package.findUnique({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json({ package: packageFound });
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
  const { name, description, features, priceInCents } = await request.json();
  try {
    const packageUpdated = await db.package.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name: name,
        description: description,
        features: features,
        priceInCents: priceInCents,
      },
    });
    return NextResponse.json({ package: packageUpdated }, { status: 201 });
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.package.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(
      { message: 'Package deleted successfully' },
      { status: 200 }
    );
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
