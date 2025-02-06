import { AirtableBoat, AirtableBoatResponse, Item } from '@magnetic/interfaces';
import {
  URL_GET_AIRTABLE_BOATS,
  URL_IMPORT_AIRTABLE_BOAT,
  URL_REIMPORT_AIRTABLE_BOAT,
} from './api-constants';

export async function getBoatsAirtable({
  offset,
}: {
  offset?: string;
}): Promise<AirtableBoatResponse> {
  const queryString = offset ? new URLSearchParams({ offset }).toString() : '';
  const url = `${URL_GET_AIRTABLE_BOATS}?${queryString}`;
  const response = await fetch(url);
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function importBoat(data: AirtableBoat): Promise<Item> {
  const response = await fetch(URL_IMPORT_AIRTABLE_BOAT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function reImportBoat(data: AirtableBoat): Promise<Item> {
  const response = await fetch(URL_REIMPORT_AIRTABLE_BOAT, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}
