import db from 'apps/magnetic/src/app/libs/db';
import { NextRequest, NextResponse } from 'next/server';
import ical from 'ical';

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

  const boat = await db.boatAttributes.findUnique({
    where: { id: Number(boatId) },
  });

  if (!boat) {
    return NextResponse.json({ message: 'Missing boat' }, { status: 400 });
  }

  let icalEvents: { startDate: Date; endDate: Date; source: string }[] = [];
  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (boat.iCal) {
    try {
      const response = await fetch(boat.iCal);
      const iCalData = await response.text();
      const events = ical.parseICS(iCalData);

      icalEvents = Object.values(events)
        .filter((event) => event.type === 'VEVENT' && event.start && event.end)
        .map((event) => ({
          startDate: new Date(event.start || ''),
          endDate: new Date(event.end || ''),
          source: 'ical',
        }))
        .filter(
          (event) => event.startDate >= fromDate && event.endDate <= toDate
        ); // Filtrar por rango de fechas
    } catch (error) {
      console.error('Error fetching or parsing iCal:', error);
    }
  }

  try {
    const dbEvents = await db.boatAvailability.findMany({
      where: {
        boatId: boat.id,
        AND: [{ startDate: { gte: fromDate } }, { endDate: { lte: toDate } }],
      },
      select: {
        startDate: true,
        endDate: true,
      },
      orderBy: { startDate: 'asc' },
    });

    const formattedDbEvents = dbEvents.map((event) => ({
      startDate: event.startDate,
      endDate: event.endDate,
      source: 'app',
    }));

    return NextResponse.json([...formattedDbEvents, ...icalEvents]); // Unificar eventos de DB e iCal
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
