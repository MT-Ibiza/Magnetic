import { SortServices } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data: SortServices = await request.json();
  const { positions } = data;

  try {
    const updatePromises = positions.map((service) =>
      db.service.update({
        where: { id: service.serviceId },
        data: { position: service.position },
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
