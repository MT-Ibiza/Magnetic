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
      return new Response('No iCal found', {
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
            `Invalid event: missing start or end for boatId iCal ${boat.id}`
          );
        }
        return {
          boatId: boat.id,
          startDate: new Date(event.start),
          endDate: new Date(event.end),
        };
      });

    // await db.boatAvailability.deleteMany({
    //   where: { boatId: boat.id },
    // });

    await db.boatAvailability.createMany({
      data: availability,
    });

    return NextResponse.json({ message: 'Availability imported successfully' });
  } catch (error) {
    console.error(error);
    return new Response('Internal server error', {
      status: 500,
    });
  }
}
