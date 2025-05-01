import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
import ical from 'node-ical';

import pLimit from 'p-limit';

export async function POST() {
  try {
    const boats = await db.boatAttributes.findMany({
      select: {
        id: true,
        iCal: true,
        secondName: true,
      },
      where: {
        iCal: { not: null },
        item: {
          published: true,
        },
      },
    });

    console.log(`Processing ${boats.length} boats with calendars`);

    let updatedBoats = 0;

    const limit = pLimit(3); // Solo 3 fetch simultáneos

    const tasks = boats.map((boat) =>
      limit(async () => {
        try {
          const events = await ical.async.fromURL(boat.iCal as string);
          const calendarEvents = Object.values(events).reduce(
            (acc, calendarEvent) => {
              if (calendarEvent.type === 'VEVENT') {
                acc.push({
                  boatId: boat.id,
                  startDate: calendarEvent.start
                    ? new Date(calendarEvent.start)
                    : new Date(),
                  endDate: calendarEvent.end
                    ? new Date(calendarEvent.end)
                    : new Date(),
                  text: `${calendarEvent.summary}`,
                  source: 'ical',
                });
              }
              return acc;
            },
            [] as {
              startDate: Date;
              endDate: Date;
              source: string;
              text: string;
              boatId: number;
            }[]
          );

          if (calendarEvents.length === 0) {
            console.log(
              `Boat ${boat.secondName}, Total events: ${calendarEvents.length}`
            );
            console.log(`iCal: ${boat.iCal} `);
          }

          if (calendarEvents.length > 0) {
            await db.boatAvailability.deleteMany({
              where: { boatId: boat.id, source: 'ical' },
            });
          }


          if (calendarEvents.length > 0) {
            await db.boatAvailability.createMany({ data: calendarEvents });
          }

          updatedBoats++;
        } catch (error) {
          console.error(
            `Error processing boat ${boat.id} (${boat.secondName}):`,
            error
          );
        }
      })
    );

    await Promise.all(tasks);
    console.log(`Updated ${updatedBoats} boats successfully`);

    return NextResponse.json({
      message: `Updated ${updatedBoats} boats successfully`,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
