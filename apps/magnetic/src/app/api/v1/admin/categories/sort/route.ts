import { SortCategories, SortImages } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data: SortCategories = await request.json();
  const { serviceId, positions } = data;

  try {
    const updatePromises = positions.map(({ categoryId, position }) =>
      db.category.update({
        where: { id: categoryId, serviceId },
        data: { position },
      })
    );

    await Promise.all(updatePromises);
    return NextResponse.json({ message: 'Positions updated successfully' });
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
