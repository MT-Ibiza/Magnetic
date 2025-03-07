import {
  AirtableBoatField,
  AirtableBoatResponse,
  AirtableParams,
} from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const offset = searchParams.get('offset') || undefined;
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

  try {
    const importedBoats = await db.boatAttributes.findMany({
      where: {
        airtableId: {
          not: null,
        },
      },
      select: {
        airtableId: true,
        item: {
          select: {
            id: true,
          },
        },
      },
    });

    const boats = importedBoats.map((ib) => {
      return {
        airtableId: ib.airtableId,
        itemId: ib.item.id,
      };
    });

    const airtableBoats = await getBoatsAirtable({
      offset,
      pageSize,
      importedBoats: boats,
    });

    return NextResponse.json(airtableBoats, {
      status: 200,
    });
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

async function getBoatsAirtable({
  offset,
  pageSize,
  importedBoats,
}: AirtableParams): Promise<AirtableBoatResponse> {
  try {
    const url = new URL(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BOATS_ID}/Boats`
    );
    url.searchParams.append('view', 'App Boats');
    url.searchParams.append('pageSize', pageSize.toString());
    if (offset) {
      url.searchParams.append('offset', offset);
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from Airtable: ${response.status} - ${response.statusText}`
      );
    }

    const parsedResponse = await response.json();

    const service = await db.service.findMany({
      where: {
        serviceType: 'boat_rental' as 'boat_rental',
      },
    });
    const serviceId = service[0]?.id;

    return {
      records: parsedResponse.records.map((record: AirtableBoatField) => {
        const importedBoat = importedBoats.find(
          (boat) => boat.airtableId === record.id
        );
        const boat = getFieldsBoats(record);
        return {
          ...boat,
          imported: !!importedBoat,
          item: importedBoat?.itemId
            ? {
                id: importedBoat.itemId,
                serviceId,
              }
            : undefined,
        };
      }),
      ...(parsedResponse.offset && { offset: parsedResponse.offset }),
    };
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    throw new Error('Could not retrieve boats data from Airtable.');
  }
}

function getFieldsBoats(record: AirtableBoatField) {
  const { fields } = record;
  return {
    id: record.id,
    boat: fields.Boat,
    name: fields.Name,
    port: fields.Port,
    lengthInMeters: fields['Length (M)'],
    sizeInFeet: fields['Length (F)'],
    beamInMeters: fields['Beam (M)'],
    capacity: fields.Capacity, //guests
    price: fields.Pricing,
    cabins: Number(fields.Cabins),
    type: fields.Type,
    crew: fields.Crew,
    fuelConsumption: fields['Fuel Consuption (L/H)'],
    included: fields.Included,
    iCal: fields.iCal,
    locationMapUrl: fields.Location,
  };
}
