import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, description, features, priceInCents } = await request.json();

  try {
    const newPackage = await db.package.create({
      data: {
        name: name,
        description: description as string,
        features: features,
        priceInCents: priceInCents,
      },
    });
    return NextResponse.json({ package: newPackage });
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
    const packages = await db.package.findMany();
    return NextResponse.json(packages);
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
