import {
  AirtableBoatField,
  AirtableBoatResponse,
  AirtableParams,
} from '@magnetic/interfaces';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  try {
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

async function gentBoatsAirtable({
  offset,
  pageSize,
}: AirtableParams): Promise<AirtableBoatResponse> {
  const url = new URL(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_RENTALS_ID}/Portfolio`
  );
  url.searchParams.append('view', 'App Example');
  url.searchParams.append('pageSize', pageSize.toString());
  url.searchParams.append('offset', offset);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
    },
  });
  const parsedResponse = await response.json();
  return {
    records: parsedResponse.records.map((record: AirtableBoatField) => {
      return getFieldsRentalProperty(record);
    }),
    ...(parsedResponse.offset && { offset: parsedResponse.offset }),
  };
}

function getFieldsRentalProperty(record: AirtableBoatField) {
  return {
    id: record.id,
    name: record.Name,
    port: record.Port,
    length: record['Length (F)'],
    capacity: record.Capacity,
    price: record.Pricing,
  };
}
