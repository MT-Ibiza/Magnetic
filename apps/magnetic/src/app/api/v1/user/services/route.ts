import { NewService } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const services = await db.service.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        position: true,
        packages: {
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
      },
      orderBy: {
        position: 'asc',
      },
    });
    return NextResponse.json(services);
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
