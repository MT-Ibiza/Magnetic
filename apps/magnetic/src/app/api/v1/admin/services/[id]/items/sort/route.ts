import { SortItems } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data: SortItems = await request.json();
  const { positions } = data;

  try {
    await db.$transaction(
      positions.map((item) =>
        db.item.updateMany({
          where: { id: item.itemId, serviceId: Number(params.id) },
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
