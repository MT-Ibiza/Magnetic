import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';
import ical from 'ical';
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
          const response = await fetch(boat.iCal as string, {
            credentials: 'omit',
          });

          if (!response.ok) {
            console.log(`Fetching iCal for boat ${boat.secondName} failed`, response.status, response.statusText);
            return;
          }

          const iCalData = await response.text();
          const events = ical.parseICS(iCalData);

          const calendarEvents = Object.values(events)
            .filter(
              (event) => event?.type === 'VEVENT' && event.start && event.end
            )
            .map((event) => ({
              boatId: boat.id,
              startDate: event.start ? new Date(event.start) : new Date(),
              endDate: event.end ? new Date(event.end) : new Date(),
              text: event.summary || '',
              source: 'ical',
            }));

          console.log(`${boat.secondName} calendarEvents:`, calendarEvents.length);

          await db.boatAvailability.deleteMany({
            where: { boatId: boat.id, source: 'ical' },
          });

          if (calendarEvents.length > 0) {
            await db.boatAvailability.createMany({ data: calendarEvents });
          }

          updatedBoats++;
        } catch (error) {
          console.error(`Error processing boat ${boat.id} (${boat.secondName}):`, error);
        }
      })
    );

    await Promise.all(tasks);

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
