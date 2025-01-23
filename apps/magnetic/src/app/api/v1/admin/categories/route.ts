import { NewCategory } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data: NewCategory = await request.json();
  const { name, description, serviceId } = data;

  try {
    const category = await db.category.create({
      data: {
        name,
        description,
        serviceId,
      },
    });
    return NextResponse.json(category);
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
    const categories = await db.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        service: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return NextResponse.json(categories);
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
