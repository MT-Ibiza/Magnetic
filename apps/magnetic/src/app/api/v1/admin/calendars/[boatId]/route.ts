import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
import ical from 'node-ical';

export async function POST(
  request: Request,
  { params }: { params: { boatId: string } }
) {
  try {
    const boatId = Number(params.boatId);
    if (isNaN(boatId)) {
      return new Response('Invalid boatId', {
        status: 400,
      });
    }

    const boat = await db.boatAttributes.findUnique({
      where: { id: boatId },
    });

    if (!boat) {
      return new Response('No boat found', {
        status: 404,
      });
    }

    if (!boat.iCal) {
      return new Response('No iCal URL found');
    }

    const events = await ical.async.fromURL(boat.iCal);

    const availability = Object.values(events).reduce((acc, calendarEvent) => {
      if (calendarEvent.type === 'VEVENT') {
        acc.push({
          boatId: boat.id,
          startDate: calendarEvent.start
            ? new Date(calendarEvent.start)
            : new Date(),
          endDate: calendarEvent.end ? new Date(calendarEvent.end) : new Date(),
          text: `${calendarEvent.summary}`,
          source: 'ical',
        });
      }
      return acc;
    }, [] as { startDate: Date; endDate: Date; source: string; text: string; boatId: number }[]);

    console.log('calendarEvents: ', availability.length)

    await db.boatAvailability.deleteMany({
      where: {
        boatId: boat.id,
        source: 'ical',
      },
    });

    for (const event of availability) {
      const conflicts = await db.boatAvailability.findMany({
        where: {
          boatId: boat.id,
          source: 'app',
          OR: [
            {
              startDate: {
                lte: event.endDate,
              },
              endDate: {
                gte: event.startDate,
              },
            },
          ],
        },
      });

      if (conflicts.length === 0) {
        await db.boatAvailability.create({
          data: event,
        });
      } else {
        console.warn(
          `Conflict detected for boat ${boat.id} between ${event.startDate} and ${event.endDate}`
        );
      }
    }

    return NextResponse.json({ message: 'Availability imported successfully' });
  } catch (error) {
    console.error(error);
    return new Response('Internal server error', {
      status: 500,
    });
  }
}
