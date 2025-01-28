import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const providers = await db.provider.findMany({
      select: {
        id: true,
        name: true,
        website: true,
      },
    });

    const packages = await db.package.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json({ providers, packages });
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
