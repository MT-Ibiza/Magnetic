import { EditCategory } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await db.category.findUnique({
      where: {
        id: Number(params.id),
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data: EditCategory = await request.json();
  const { name, description, serviceId, formType } = data;
  try {
    const category = await db.category.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name,
        description,
        serviceId,
        formType,
      },
    });
    return NextResponse.json(category, { status: 201 });
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
