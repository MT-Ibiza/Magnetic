import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const packages = await db.package.findMany();
    const services = await db.service.findMany({
      include: {
        packages: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return NextResponse.json({ packages, services });
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
