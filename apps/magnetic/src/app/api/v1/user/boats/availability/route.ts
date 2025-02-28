import db from 'apps/magnetic/src/app/libs/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const boatId = searchParams.get('boatId');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  if (!boatId || !from || !to) {
    return NextResponse.json(
      { message: 'Missing required query parameters: boatId, from, to' },
      { status: 400 }
    );
  }

  try {
    const results = await db.boatAvailability.findMany({
      where: {
        boatId: Number(boatId),
        AND: [
          { startDate: { gte: new Date(from) } },
          { endDate: { lte: new Date(to) } },
        ],
      },
      select: {
        startDate: true,
        endDate: true,
      },
      orderBy: { startDate: 'asc' },
    });

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error.message || 'An error occurred while fetching availability',
      },
      { status: 500 }
    );
  }
}
