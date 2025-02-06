import {
  AirtableBoatField,
  AirtableBoatResponse,
  AirtableParams,
} from '@magnetic/interfaces';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const offset = searchParams.get('offset') || undefined;
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

  try {
    const boats = await getBoatsAirtable({ offset, pageSize });
    return NextResponse.json(boats, {
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
}: AirtableParams): Promise<AirtableBoatResponse> {
  const url = new URL(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BOATS_ID}/Boats`
  );
  url.searchParams.append('view', 'App Example');
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
      `Failed to fetch data from Airtable: ${response.statusText}`
    );
  }

  const parsedResponse = await response.json();

  return {
    records: parsedResponse.records.map((record: AirtableBoatField) => {
      return getFieldsBoats(record);
    }),
    ...(parsedResponse.offset && { offset: parsedResponse.offset }),
  };
}

function getFieldsBoats(record: AirtableBoatField) {
  const { fields } = record;
  return {
    id: record.id,
    name: fields.Name,
    port: fields.Port,
    length: fields['Length (F)'],
    capacity: fields.Capacity,
    price: fields.Pricing,
  };
}
