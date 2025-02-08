import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
import ical from 'ical';

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
      return new Response('No iCal URL found', {
        status: 404,
      });
    }

    const response = await fetch(boat.iCal);
    if (!response.ok) {
      return new Response('Failed to fetch iCal data', {
        status: 500,
      });
    }

    const iCalData = await response.text();
    const events = ical.parseICS(iCalData);

    const availability = Object.values(events)
      .filter((event) => event.type === 'VEVENT')
      .map((event) => {
        if (!event.start || !event.end) {
          throw new Error(
            `Invalid event: missing start or end for boatId ${boat.id}`
          );
        }
        return {
          boatId: boat.id,
          startDate: new Date(event.start),
          endDate: new Date(event.end),
          text: `${event.summary}`,
          source: 'ical',
        };
      });

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
