import { SortImages } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data: SortImages = await request.json();
  const { itemId, positions } = data;

  try {
    await db.$transaction(
      positions.map((item) =>
        db.image.updateMany({
          where: { id: item.imageId, itemId },
          data: { position: item.position },
        })
      )
    );

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
