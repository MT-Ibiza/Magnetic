import { NewPackage } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const params: NewPackage = await request.json();
  const { name, description, features, priceInCents } = params;
console.log(features)
  try {
    const packageData = await db.package.create({
      data: {
        name: name,
        description: description,
        features: features,
        priceInCents: priceInCents,
      },
    });
    return NextResponse.json(packageData);
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