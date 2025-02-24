import { SortServices } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data: SortServices = await request.json();
  const { positions } = data;

  try {
    await db.$transaction(
      positions.map((service) =>
        db.service.updateMany({
          where: { id: service.serviceId },
          data: { position: service.position },
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
